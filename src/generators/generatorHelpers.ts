import {AccessModifier} from "../structures/AccessModifier";
import {PolymorphicModifier} from "../structures/PolymorphicModifier";

export function accessModifier(accessModifier: AccessModifier) {
    switch (accessModifier){
        case AccessModifier.Public:
            return "public";
        case AccessModifier.Protected:
            return "protected";
        case AccessModifier.Private:
            return "private";
        case AccessModifier.Internal:
            return "internal";
    }
}

export function polymorphicModifier(polymorphicModifier: PolymorphicModifier) {
    switch (polymorphicModifier){
        case PolymorphicModifier.Abstract:
            return "abstract";
        case PolymorphicModifier.Virtual:
            return "virtual";
        case PolymorphicModifier.Override:
            return "override";
    }
}