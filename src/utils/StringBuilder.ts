export class StringBuilder{
    private result: string = "";

    append(toAppend: string){
        this.result = this.result.concat(toAppend);
    }

    appendLine(toAppend: string = ""){
        this.result = this.result.concat(toAppend).concat("\n");
    }

    indent(spaces: number){
        for (let i = 0; i < spaces; i++) {
            this.append(" ");
        }
    }

    toString(): string {
        return this.result;
    }
}