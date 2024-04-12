export class QueryObject{

    private name:string;
    private num: number;

    public constructor(name: string, num: number){
        this.name = name;
        this.num = num;
    }

    public userName(): String {
        return this.name;
    }

    public maisDez(): Number {
        return this.num + 10
    }
    
}