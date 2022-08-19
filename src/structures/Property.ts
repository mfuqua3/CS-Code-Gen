import {CsStructure} from "./CsStructure";
import {AccessModifier} from "./AccessModifier";

export interface Property extends CsStructure {
    type: string;
    value?: unknown;
    getOnly?: boolean;
}