import {CsStructure} from "./CsStructure";
import {Parameter} from "./Parameter";
import {PolymorphicModifier} from "./PolymorphicModifier";

export interface Method extends CsStructure {
    parameters: Parameter[];
    returnType: string;
    contentLines: string[];
    isAsync?: boolean;
    polymorphicModifier?: PolymorphicModifier;
    isStatic?: boolean;
}