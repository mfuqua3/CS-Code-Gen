import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {Method} from "../structures/Method";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {AttributeWriter} from "./AttributeWriter";
import {accessModifier, polymorphicModifier} from "./generatorHelpers";
import {camelCase, pascalCase} from "change-case";

export class MethodWriter extends TypedCsStructureWriter<Method> {
    typeSafeWrite(structure: Method, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const methodSb = new StringBuilder();
        if (structure.attributes?.length) {
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                methodSb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        methodSb.indent(currentIndent);
        methodSb.append(accessModifier(structure.accessModifier));
        if (structure.isStatic) {
            methodSb.append(" static");
        }
        if (structure.polymorphicModifier) {
            methodSb.append(` ${polymorphicModifier(structure.polymorphicModifier)}`);
        }
        methodSb.append(" ");
        if (structure.isAsync) {
            methodSb.append("async Task");
            if (structure.returnType !== "void") {
                methodSb.append("<");
            }
        }
        if (!structure.isAsync || structure.returnType !== "void") {
            methodSb.append(structure.returnType);
        }
        if (structure.isAsync && structure.returnType !== "void") {
            methodSb.append(">");
        }
        methodSb.append(` ${pascalCase(structure.name)}(`);
        const params = structure.parameters
            .map(param => `${pascalCase(param.type)} ${camelCase(param.name)}${param.defaultValue !== undefined ? ` = ${param.defaultValue}` : ""}`)
            .join(", ");
        methodSb.appendLine(`${params})`);
        methodSb.indent(currentIndent);
        methodSb.appendLine("{");
        currentIndent += 4;
        for (const line of structure.contentLines) {
            methodSb.indent(currentIndent);
            methodSb.appendLine(line);
        }
        currentIndent -= 4;
        methodSb.indent(currentIndent);
        methodSb.append("}");
        return methodSb.toString();
    }

}