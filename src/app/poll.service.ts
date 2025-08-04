import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from './poll.models';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private baseurl = 'http://localhost:8080/api/polls';

  constructor(private http: HttpClient) {}

  // Accept Partial<Poll> since we don't send id when creating
  createPoll(poll: Partial<Poll>): Observable<Poll> {
    return this.http.post<Poll>(this.baseurl, poll);
  }

  getpolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseurl);
  }

  // vote(pollid: number, optionindex: number): Observable<void> {
  //   const url = `${this.baseurl}/vote`;  // FIXED: backticks used correctly
  //   return this.http.post<void>(url, { pollid, optionindex });
  // }
  vote(pollid: number, optionindex: number): Observable<Poll> {
  const url = `${this.baseurl}/vote`;
  return this.http.post<Poll>(url, { pollid, optionindex });
}
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Poll } from './poll.models';

// @Injectable({
//   providedIn: 'root'
// })
// export class PollService {
//   private baseurl='http://localhost:8080/api/polls'

//   constructor(private http:HttpClient) { }

//   createPoll(poll:Poll): Observable<Poll>{
//      return this.http.post<Poll>(this.baseurl,poll);

//   }

//   getpolls():Observable<Poll[]>{
//     return this.http.get<Poll[]>(this.baseurl);
//   }

//   vote(pollid:number,optionindex:number):Observable<void>{
//     const url='${this.baseurl}/vote';
//     return this.http.post<void>(url,{pollid,optionindex});
//   }


// }




