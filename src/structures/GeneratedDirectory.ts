import {CsFile} from "./CsFile";

export interface GeneratedDirectory {
    name: string;
    files: CsFile[];
    subDirectories: GeneratedDirectory[];
}