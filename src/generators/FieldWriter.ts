import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {Field} from "../structures/Field";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {AttributeWriter} from "./AttributeWriter";
import {accessModifier} from "./generatorHelpers";
import {camelCase, pascalCase} from "change-case";
import {AccessModifier} from "../structures/AccessModifier";

export class FieldWriter extends TypedCsStructureWriter<Field> {
    typeSafeWrite(structure: Field, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const fieldSb = new StringBuilder();
        if (structure.attributes?.length) {
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                fieldSb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        fieldSb.indent(currentIndent);
        fieldSb.append(accessModifier(structure.accessModifier));
        if (structure.isConst) {
            fieldSb.append(" const");
        }
        if (structure.isStatic) {
            fieldSb.append(" static");
        }
        if (structure.isReadOnly) {
            fieldSb.append(" readonly");
        }
        fieldSb.append(` ${structure.type}`);
        const name = structure.accessModifier === AccessModifier.Private ? `_${camelCase(structure.name)}` : pascalCase(structure.name);
        fieldSb.append(` ${name};`);
        return fieldSb.toString();
    }

}