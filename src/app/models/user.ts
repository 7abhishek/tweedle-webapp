export class User {
    userId:string;
    name:string;
    source:string;
    picture:string;

    constructor(userId:string, name:string, source:string,picture:string){
        this.userId = userId;
        this.name=name;
        this.source=source;
        this.picture=picture;
    }
}
