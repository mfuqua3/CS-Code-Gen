import {Argument} from "./Argument";

export interface Attribute {
    name: string;
    constructorArguments?: Argument[];
    declarativeArguments?: Argument[];
}