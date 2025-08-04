export interface Optionvote{
    optiontext:string;
    votecount:number;
}


export interface Poll {
    id:number;
    question:string;
    options:Optionvote[]
    
}


// export type CreatePollRequest = Omit<Poll, 'id'>;