import {CsStructure} from "./CsStructure";
import {StructureKind} from "./StructureKind";
import {EnumField} from "./EnumField";

export interface Enum extends CsStructure {
    kind: StructureKind.Enum;
    fields: EnumField[];
}

