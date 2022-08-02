import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {CsClass} from "../structures/CsClass";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {pascalCase} from "change-case";
import {accessModifier} from "./generatorHelpers";
import {StructureKind} from "../structures/StructureKind";
import {CsStructure} from "../structures/CsStructure";
import {CsWriter} from "./CsWriter";
import {AttributeWriter} from "./AttributeWriter";

export class CsClassWriter extends TypedCsStructureWriter<CsClass> {
    typeSafeWrite(structure: CsClass, params: CsWriterContext): string {
        let currentIndent = params.baseIndent;
        const classSb = new StringBuilder();
        if(structure.attributes?.length){
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                classSb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        classSb.indent(currentIndent);
        classSb.append(`${accessModifier(structure.accessModifier)}`);
        if (structure.isStatic) {
            classSb.append(" static");
        }
        if (structure.abstract) {
            classSb.append(" abstract");
        }
        classSb.append(` class ${pascalCase(structure.name)}`);
        if (structure.interfaces?.length || structure.baseClass) {
            classSb.append(": ");
            const inheritors: string[] = [];
            if (structure.baseClass) {
                inheritors.push(structure.baseClass);
            }
            if (structure.interfaces?.length) {
                inheritors.push(...structure.interfaces);
            }
            classSb.append(inheritors.join(", "));
        }
        classSb.appendLine();
        classSb.indent(currentIndent);
        classSb.appendLine("{");
        currentIndent += 4;
        const fields = structure.members.filter(x => x.kind === StructureKind.Field);
        const properties = structure.members.filter(x => x.kind === StructureKind.Property);
        const constructors = structure.members.filter(x => x.kind === StructureKind.Constructor);
        const methods = structure.members.filter(x => x.kind === StructureKind.Method);
        const classes = structure.members.filter(x => x.kind === StructureKind.Class);
        const enums = structure.members.filter(x => x.kind === StructureKind.Enum);
        if(fields.length){
            classSb.appendLine(this.writePublicToPrivate(fields, currentIndent, StructureKind.Field));
        }
        if(properties.length){
            classSb.appendLine(this.writePrivateToPublic(properties, currentIndent, StructureKind.Property));
        }
        if(constructors.length){
            classSb.appendLine(this.writePublicToPrivate(constructors, currentIndent, StructureKind.Constructor));
        }
        if(methods.length){
            classSb.appendLine(this.writePublicToPrivate(methods, currentIndent, StructureKind.Method));
        }
        if(classes.length){
            classSb.appendLine(this.writePublicToPrivate(classes, currentIndent, StructureKind.Class));
        }
        if(enums.length){
            classSb.appendLine(this.writePublicToPrivate(enums, currentIndent, StructureKind.Enum));
        }
        currentIndent -= 4;
        classSb.indent(currentIndent);
        classSb.append("}");
        return classSb.toString();
    }

    private writePrivateToPublic(members: CsStructure[], indent: number, kind: StructureKind): string{
        const sectionSb = new StringBuilder();
        const writer = new CsWriter().getStructureWriter(kind)
        for (const member of members.sort((a,b)=>a.accessModifier - b.accessModifier)) {
            sectionSb.appendLine(writer.write(member, {baseIndent: indent}));
        }
        return sectionSb.toString();
    }

    private writePublicToPrivate(members:CsStructure[], indent: number, kind: StructureKind): string{
        const sectionSb = new StringBuilder();
        const writer = new CsWriter().getStructureWriter(kind)
        for (const member of members.sort((a,b)=>b.accessModifier - a.accessModifier)) {
            sectionSb.appendLine(writer.write(member, {baseIndent: indent}));
        }
        return sectionSb.toString();

    }

}