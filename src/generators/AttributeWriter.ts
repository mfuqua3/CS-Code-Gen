import {Attribute} from "../structures/Attribute";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {pascalCase} from "change-case";
import {argumentValue} from "../../src/utils/argumentValue";

export class AttributeWriter {
    write(structure: Attribute, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const attrSb = new StringBuilder();
        attrSb.indent(currentIndent);
        attrSb.append("[");
        attrSb.append(pascalCase(structure.name));
        if(!structure.constructorArguments?.length && !structure.declarativeArguments?.length){
            attrSb.append("]");
            return attrSb.toString();
        }
        attrSb.append("(");
        if(structure.constructorArguments?.length){
            attrSb.append(structure.constructorArguments.map(x=>argumentValue(x)).join(", "));
        }
        if(structure.declarativeArguments?.length){
            if(structure.constructorArguments?.length){
                attrSb.append(", ");
            }
            attrSb.append(structure.declarativeArguments.map(arg=>`${pascalCase(arg.name)} = ${argumentValue(arg)}`).join(", "));
        }
        attrSb.append(")");
        attrSb.append("]");
        return attrSb.toString();
    }
}