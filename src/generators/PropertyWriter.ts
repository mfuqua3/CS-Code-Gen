import {TypedCsStructureWriter} from "./TypedCsStructureWriter";
import {Property} from "../structures/Property";
import {CsWriterContext} from "./CsStructureWriter";
import {StringBuilder} from "../utils/StringBuilder";
import {AttributeWriter} from "./AttributeWriter";
import {accessModifier} from "./generatorHelpers";
import {pascalCase} from "change-case";
import {propertyValue} from "../../src/utils/argumentValue";

export class PropertyWriter extends TypedCsStructureWriter<Property> {
    typeSafeWrite(structure: Property, context: CsWriterContext): string {
        let currentIndent = context.baseIndent;
        const propertySb = new StringBuilder();
        if (structure.attributes?.length) {
            const attributeWriter = new AttributeWriter();
            for (const attribute of structure.attributes) {
                propertySb.appendLine(attributeWriter.write(attribute, {baseIndent: currentIndent}));
            }
        }
        propertySb.indent(currentIndent);
        propertySb.append(`${accessModifier(structure.accessModifier)} ${structure.type} ${pascalCase(structure.name)}`);
        if(structure.getOnly && structure.value){
            propertySb.append(` => ${structure.value};`);
            return propertySb.toString();
        }
        propertySb.append(" { get; set; }");
        return propertySb.toString();
    }

}