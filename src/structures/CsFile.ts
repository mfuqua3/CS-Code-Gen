import {CsStructure} from "./CsStructure";

export interface CsFile {
    name: string;
    usingStatements: string[];
    members: CsStructure[];
    namespace: string;
}

