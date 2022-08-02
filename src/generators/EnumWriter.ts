import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {Enum} from "../structures/Enum";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {AttributeWriter} from "./AttributeWriter";
import {accessModifier} from "./generatorHelpers";
import {camelCase, pascalCase} from "change-case";
import {EnumField} from "../structures/EnumField";

export class EnumWriter extends TypedCsStructureWriter<Enum> {
    typeSafeWrite(structure: Enum, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const enumSb = new StringBuilder();
        if(structure.attributes?.length){
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                enumSb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        enumSb.indent(currentIndent);
        enumSb.appendLine(`${accessModifier(structure.accessModifier)} enum ${pascalCase(structure.name)}`);
        enumSb.indent(currentIndent);
        enumSb.appendLine("{");
        currentIndent += 4;
        for (let i = 0; i < structure.fields.length; i++){
            const field = structure.fields[i];
            enumSb.appendLine(this.writeField(field, currentIndent, i === structure.fields.length - 1));
        }
        currentIndent -= 4;
        enumSb.indent(currentIndent);
        enumSb.append("}");
        return enumSb.toString();
    }

    writeField(field: EnumField, baseIndent: number, isLast: boolean): string{
        const fieldSb = new StringBuilder();
        if(field.attributes?.length){
            const attributeWriter = new AttributeWriter();
            for (const attribute of field.attributes) {
                fieldSb.appendLine(attributeWriter.write(attribute, {baseIndent: baseIndent}));
            }
        }
        fieldSb.indent(baseIndent);
        fieldSb.append(pascalCase(field.name));
        if(field.value !== undefined){
            fieldSb.append(` = ${field.value}`)
        }
        if(!isLast){
            fieldSb.append(",");
        }
        return fieldSb.toString();
    }

}