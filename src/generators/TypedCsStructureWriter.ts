import {CsStructure} from "../structures/CsStructure";
import {CsStructureWriter, CsWriterContext} from "./CsStructureWriter";

export abstract class TypedCsStructureWriter<T extends CsStructure> implements CsStructureWriter {
    write(structure: CsStructure, context: CsWriterContext): string {
        return this.typeSafeWrite(structure as T, context);
    }
    abstract typeSafeWrite(structure: T, context: CsWriterContext): string;
}

