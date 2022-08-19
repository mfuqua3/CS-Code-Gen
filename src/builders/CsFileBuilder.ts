import {CsClassParams, WithoutKind} from "../utils/types";
import {CsClassBuilder} from "./CsClassBuilder";
import {CsStructure} from "../structures/CsStructure";
import {Enum} from "../structures/Enum";
import {StructureKind} from "../structures/StructureKind";
import {CsFile} from "../structures/CsFile";

export class CsFileBuilder implements CsFile {
    usingStatements: string[] = [];
    namespace: string = "";
    members: CsStructure[] = [];

    constructor(public readonly name: string) {
    }

    addClass(params: CsClassParams): CsClassBuilder {
        const csClass = new CsClassBuilder(params);
        this.members.push(csClass);
        return csClass;
    }

    addEnum(enumParams: WithoutKind<Enum>){
        this.members.push({...enumParams, kind: StructureKind.Enum});
    }

}