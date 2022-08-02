import {CsStructure} from "./CsStructure";

export interface Field extends CsStructure {
    type: string;
    value?: unknown;
    isReadOnly?: boolean;
    isConst?: boolean;
    isStatic?: boolean;
}