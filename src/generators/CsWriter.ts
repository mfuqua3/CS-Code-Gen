import {StructureKind} from "../structures/StructureKind";
import {CsStructureWriter} from "./CsStructureWriter";
import {FieldWriter} from "./FieldWriter";
import {MethodWriter} from "./MethodWriter";
import {ConstructorWriter} from "./ConstructorWriter";
import {PropertyWriter} from "./PropertyWriter";
import {EnumWriter} from "./EnumWriter";
import {CsClassWriter} from "./CsClassWriter";

export class CsWriter {
    public getStructureWriter(kind: StructureKind): CsStructureWriter {
        switch (kind) {
            case StructureKind.Class:
                return new CsClassWriter();
            case StructureKind.Enum:
                return new EnumWriter();
            case StructureKind.Property:
                return new PropertyWriter();
            case StructureKind.Field:
                return new FieldWriter();
            case StructureKind.Constructor:
                return new ConstructorWriter();
            case StructureKind.Method:
                return new MethodWriter();
        }
    }

}