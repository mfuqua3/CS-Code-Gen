import {AccessModifier} from "./AccessModifier";
import {StructureKind} from "./StructureKind";
import {Attribute} from "./Attribute";

export interface CsStructure {
    accessModifier: AccessModifier;
    name: string;
    kind: StructureKind;
    attributes?: Attribute[];
}