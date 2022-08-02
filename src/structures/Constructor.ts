import {CsStructure} from "./CsStructure";
import {Parameter} from "./Parameter";
import {Argument} from "./Argument";

export interface Constructor extends CsStructure {
    parameters: Parameter[];
    contentLines: string[];
    baseArguments?: Argument[];
}