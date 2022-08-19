import { pascalCase } from "change-case";
import {CsFileBuilder} from "./CsFileBuilder";
import {CsFile} from "../structures/CsFile";
import {GeneratedDirectory} from "../structures/GeneratedDirectory";
import sanitize from "sanitize-filename";

export class DirectoryBuilder implements GeneratedDirectory{
    files: CsFile[] = [];
    subDirectories: GeneratedDirectory[] = [];

    constructor(name: string) {
        this.name = pascalCase(sanitize(name));
    }

    createSourceFile(filename: string): CsFileBuilder {
        const name = pascalCase(filename) + ".cs";
        const file = new CsFileBuilder(name);
        this.files.push(file);
        return file;
    }
    createSubdirectory(directoryName: string): DirectoryBuilder{
        const builder = new DirectoryBuilder(directoryName);
        this.subDirectories.push(builder);
        return builder;
    }

    name: string;

}