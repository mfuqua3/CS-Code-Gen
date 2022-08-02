import {CsStructure} from "./CsStructure";

export interface CsClass extends CsStructure {
    abstract?: boolean;
    interfaces?: string[];
    baseClass?: string;
    isStatic?: boolean;
    members: CsStructure[];
}