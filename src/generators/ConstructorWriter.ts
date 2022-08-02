import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {Constructor} from "../structures/Constructor";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {accessModifier} from "./generatorHelpers";
import {camelCase, pascalCase} from "change-case";
import {AttributeWriter} from "./AttributeWriter";

export class ConstructorWriter extends TypedCsStructureWriter<Constructor> {
    typeSafeWrite(structure: Constructor, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const ctorSb = new StringBuilder();
        if(structure.attributes?.length){
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                ctorSb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        ctorSb.indent(currentIndent);
        ctorSb.append(`${accessModifier(structure.accessModifier)} ${pascalCase(structure.name)}(`);
        const params = structure.parameters
            .map(param => `${pascalCase(param.type)} ${camelCase(param.name)}${param.defaultValue !== undefined ? ` = ${param.defaultValue}` : ""}`)
            .join(", ");
        ctorSb.append(`${params})`);
        if(structure.baseArguments){
            ctorSb.append(" : base(");
            ctorSb.append(structure.baseArguments.map(arg=>arg.value ?? arg.name).join(", "));
            ctorSb.append(")");
        }
        ctorSb.appendLine();
        ctorSb.indent(currentIndent);
        ctorSb.appendLine("{");
        currentIndent += 4;
        for (const line of structure.contentLines) {
            ctorSb.indent(currentIndent);
            ctorSb.appendLine(line);
        }
        currentIndent -= 4;
        ctorSb.indent(currentIndent);
        ctorSb.append("}");
        return ctorSb.toString();
    }

}