import {CsStructure} from "../structures/CsStructure";
import {CsWriter} from "./CsWriter";

export interface CsWriterContext {
    baseIndent: number;
}

export interface CsStructureWriter {
    write(structure: CsStructure, context: CsWriterContext): string;
}

