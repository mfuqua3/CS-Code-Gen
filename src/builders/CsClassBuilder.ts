import {CsClass} from "../structures/CsClass";
import {CsStructure} from "../structures/CsStructure";
import {StructureKind} from "../structures/StructureKind";
import {AccessModifier} from "../structures/AccessModifier";
import {Attribute} from "../structures/Attribute";
import {Field} from "../structures/Field";
import {Property} from "../structures/Property";
import {Method} from "../structures/Method";
import {CsClassParams, WithoutKind} from "../utils/types";
import {Constructor} from "../structures/Constructor";

export class CsClassBuilder implements CsClass {
    members: CsStructure[] = [];
    kind = StructureKind.Class;
    accessModifier: AccessModifier;
    name: string;
    attributes: Attribute[] = [];
    abstract: boolean;
    interfaces: string[];
    baseClass?: string;
    isStatic: boolean;

    constructor(params: CsClassParams) {
        this.abstract = params.abstract ?? false;
        this.baseClass = params.baseClass ?? undefined;
        this.name = params.name;
        this.interfaces = params.interfaces ?? [];
        this.accessModifier = params.accessModifier;
        this.isStatic = params.isStatic ?? false;
    }

    addAttribute(attribute: Attribute): CsClassBuilder {
        this.attributes.push(attribute);
        return this;
    }

    addField(field: WithoutKind<Field>): CsClassBuilder {
        this.members.push({...field, kind: StructureKind.Field});
        return this;
    }

    addProperty(property: WithoutKind<Property>): CsClassBuilder {
        this.members.push({...property, kind: StructureKind.Property});
        return this;
    }

    addMethod(method: WithoutKind<Method>): CsClassBuilder {
        this.members.push({...method, kind: StructureKind.Method});
        return this;
    }

    addConstructor(constructor: WithoutKind<Omit<Constructor, "name">>): CsClassBuilder {
        this.members.push({...constructor, kind: StructureKind.Constructor, name: this.name});
        return this;
    }
}