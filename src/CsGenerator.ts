import {DirectoryBuilder} from "./builders/DirectoryBuilder";
import {GeneratedDirectory} from "./structures/GeneratedDirectory";
import * as fs from "fs";
import {StringBuilder} from "./utils/StringBuilder";
import {CsWriter} from "./generators/CsWriter";


export class CsGenerator   {
    private directories: GeneratedDirectory[] = [];

    public createDirectory(directoryName: string){
        const directory = new DirectoryBuilder(directoryName);
        this.directories.push(directory);
        return directory;
    }

    public run(){
        for (const directory of this.directories) {
            this.handleDirectory("./", directory);
        }
    }

    private handleDirectory(basePath: string, directory: GeneratedDirectory){
        const directoryPath = basePath + directory.name;
        if(!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath);
        }
        for (const file of directory.files) {
            const filePath = directoryPath + "/" + file.name;
            const fileSb = new StringBuilder();
            fileSb.appendLine("//Generated File")
            for (const usingStatement of file.usingStatements) {
                fileSb.appendLine(`using ${usingStatement};`)
            }
            fileSb.appendLine();
            const csWriter = new CsWriter();
            for (const member of file.members) {
                const structureWriter = csWriter.getStructureWriter(member.kind);
                fileSb.appendLine(structureWriter.write(member, {baseIndent: 0}));
                fileSb.appendLine();
            }
            if(!fs.existsSync(filePath)){
                fs.writeFile(filePath, fileSb.toString(), (err) => {
                    if (err) throw err;
                    console.log(`File ${filePath} saved`);
                });
            }
        }
        for (const subDirectory of directory.subDirectories) {
            const subDirectoryPath = directoryPath + "/";
            this.handleDirectory(subDirectoryPath, subDirectory);
        }
    }
}
