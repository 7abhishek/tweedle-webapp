export class TweedleRequest {
    tweedle:string;
    userId:string;
    trackTerms:string;
    notify:boolean;

    constructor(userId:string, tweedle:string, trackTerms:string, notify:boolean){
        this.userId = userId;
        this.tweedle=tweedle;
        this.trackTerms=trackTerms;
        this.notify = notify;
    }

    getUserId(){
        return this.userId;
    }
    getTweedle(){
        return this.tweedle;
    }
    getTrackTerms(){
        return this.trackTerms;
    }
    getNotify(){
        return this.notify;
    }

}