import {Attribute} from "../structures/Attribute";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {pascalCase} from "change-case";

export class AttributeWriter {
    write(structure: Attribute, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const attrSb = new StringBuilder();
        attrSb.indent(currentIndent);
        attrSb.append("[");
        attrSb.append(pascalCase(structure.name));
        if(!structure.constructorArguments?.length || !structure.declarativeArguments?.length){
            attrSb.append("]");
            return attrSb.toString();
        }
        attrSb.append("(");
        if(structure.constructorArguments?.length){
            attrSb.append(structure.constructorArguments.map(x=>x.value).join(", "));
        }
        if(structure.declarativeArguments?.length){
            if(structure.constructorArguments?.length){
                attrSb.append(", ");
            }
            attrSb.append(structure.declarativeArguments.map(arg=>`${pascalCase(arg.name)} = ${arg.value}`).join(", "));
        }
        attrSb.append(")");
        attrSb.append("]");
        return attrSb.toString();
    }
}