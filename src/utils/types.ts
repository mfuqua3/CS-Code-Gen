import {CsStructure} from "../structures/CsStructure";
import {CsClass} from "../structures/CsClass";
import {StructureKind} from "../structures/StructureKind";

export type CsClassParams = Omit<CsStructure, "attributes" | "kind"> & Pick<CsClass, "abstract" | "interfaces" | "baseClass" | "isStatic">
export type WithoutKind<T extends {kind: StructureKind}> = Omit<T, "kind">;