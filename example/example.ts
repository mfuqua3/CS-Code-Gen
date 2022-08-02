import {CsGenerator} from "../src/CsGenerator";
import {AccessModifier} from "../src/structures/AccessModifier";

export function example() {
    const csGenerator = new CsGenerator();
    const directory = csGenerator.createDirectory("generated");
    const testClass = directory.createSourceFile("testClass");
    testClass.usingStatements = ["System", "System.ComponentModel", "System.Text.Json"];
    testClass.addClass({
        name: "TestClass",
        accessModifier: AccessModifier.Public
    }).addAttribute({name: "JsonIgnore"})
        .addField({name: "_testIntField", accessModifier: AccessModifier.Private, type: "int", value: 10})
        .addField({name: "_testStringField", accessModifier: AccessModifier.Private, type: "string", value: "test string"})
        .addConstructor({
            accessModifier: AccessModifier.Public,
            contentLines: ['_testStringField = "from constructor"'],
            parameters: [{name: "dbContext", type: "DbContext"}]
        })
        .addProperty({
            type: "bool",
            name: "TestProperty",
            accessModifier: AccessModifier.Public,
            attributes: [{name: "Required"}]
        })
        .addMethod({
            returnType: "void",
            name: "SomeMethod",
            accessModifier: AccessModifier.Public,
            parameters: [],
            contentLines: ["throw new NotImplementedException();"]
        });
    const subdir = directory.createSubdirectory("Enums");
    const testEnum = subdir.createSourceFile("TestEnum");
    testEnum.addEnum({
        name: "TestEnum",
        accessModifier: AccessModifier.Public,
        attributes: [
            {name: "Authorize", constructorArguments: [{name: "roles", value: "DataConstants.Role.AuthCobraAdmin"}], declarativeArguments: [{name: "Policies", value: "SomePolicy"}]}
        ],
        fields: [
            {name: "Field1", value: 0, attributes: [{name: "Required"}]},
            {name: "Field2", value: 1, attributes: [{name: "Required"}]},
            {name: "Field3", value: 2, attributes: [{name: "Required"}]},
            {name: "Field4", value: 3, attributes: [{name: "Required"}]}
        ]
    });
    csGenerator.run();
}