import {Attribute} from "./Attribute";

export interface EnumField {
    name: string;
    value?: number;
    attributes?: Attribute[];
}