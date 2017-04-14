export class TweedleRequest {
    tweedle:string;
    userId:string;
    trackTerms:string;

    constructor(userId:string, tweedle:string, trackTerms:string){
        this.userId = userId;
        this.tweedle=tweedle;
        this.trackTerms=trackTerms;
    }
}