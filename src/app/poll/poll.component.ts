import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Poll } from '../poll.models';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {

  // Create poll object - no `id` here
  newPoll: Partial<Poll> = {
    question: '',
    options: [
      { optiontext: '', votecount: 0 },
      { optiontext: '', votecount: 0 }
    ]
  };

  polls: Poll[] = [];

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getpolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error("Error fetching polls: ", error);
      }
    });
  }

  createPoll() {
    // Cast newPoll as Poll without 'id' to satisfy backend (if needed)
    this.pollService.createPoll(this.newPoll as Poll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error) => {
        console.error("Error creating poll: ", error);
      }
    });
  }

  resetPoll() {
    this.newPoll = {
      question: '',
      options: [
        { optiontext: '', votecount: 0 },
        { optiontext: '', votecount: 0 }
      ]
    };
  }

  // vote(pollid: number, optionindex: number) {
  //   this.pollService.vote(pollid, optionindex).subscribe({
  //     next: (updatedPoll) => {
  //       const index = this.polls.findIndex(p => p.id === pollid);
  //       if (index !== -1 && updatedPoll) {
  //         this.polls[index] = updatedPoll; // Refresh from backend
  //       }
  //     },
  //     error: (error) => {
  //       console.error("Error voting on poll: ", error);
  //     }
  //   });
  // }

  vote(pollid: number, optionindex: number) {
  this.pollService.vote(pollid, optionindex).subscribe({
    next: (updatedPoll) => {
      if (updatedPoll) {
        // Replace the poll with updated one in the polls array
        const index = this.polls.findIndex(p => p.id === pollid);
        if (index !== -1) {
          this.polls[index] = updatedPoll;
        }
      } else {
        // If backend does not return updatedPoll,
        // manually increment vote count in local polls:
        const poll = this.polls.find(p => p.id === pollid);
        if (poll) {
          poll.options[optionindex].votecount++;
        }
      }
    },
    error: (error) => {
      console.error("Error voting on poll: ", error);
    }
  });
}


  addOption() {
    if (!this.newPoll.options) {
      this.newPoll.options = [];
    }
    this.newPoll.options.push({ optiontext: '', votecount: 0 });
  }

  removeOption() {
  if (this.newPoll.options && this.newPoll.options.length > 2) {
    this.newPoll.options.pop();
  }
}


  trackByIndex(index: number): number {
    return index;
  }

  isCreatePollDisabled(): boolean {
    if (!this.newPoll.question || !this.newPoll.question.trim()) {
      return true;
    }
    if (!this.newPoll.options || this.newPoll.options.length === 0) {
      return true;
    }
    return this.newPoll.options.some(option => !option.optiontext || !option.optiontext.trim());
  }

}



// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Poll } from '../poll.models';
// import { PollService } from '../poll.service';

// @Component({
//   selector: 'app-poll',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './poll.component.html',
//   styleUrl: './poll.component.css'
// })
// export class PollComponent implements OnInit {

//   newPoll:Poll={
//     id:0,
//     question:'',
//     options:[
//       {optiontext:'',votecount:0},
//       {optiontext:'',votecount:0}
//     ]
//   };
//   polls:Poll[]=[];

//   constructor(private pollService:PollService){
//   }
  
//   ngOnInit(): void {
//      this.loadPolls();
      
//   }
//   loadPolls(){

//     this.pollService.getpolls().subscribe({
//       next: (data) =>
//       {
//         this.polls=data;
//       },
//       error:(error)=>{
//         console.error("Error fetching polls: ", error);
//       }
//     });

//   }

//   createPoll(){

//     this.pollService.createPoll(this.newPoll).subscribe({
//       next: (createdPoll) =>{
//         this.polls.push(createdPoll);
//         this.resetPoll();
//       },
//       error: (error) => {
//         console.error("Error on creating polls: ", error);
//       }
//     });

//   }

//   resetPoll(){
//     this.newPoll={
//     id:0,
//     question:'',
//     options:[
//       {optiontext:'',votecount:0},
//       {optiontext:'',votecount:0}
//     ]
//   };
// }

// vote(pollid:number,optionindex:number)
// {
//   this.pollService.vote(pollid,optionindex).subscribe({

//     next: () =>{
//         const poll=this.polls.find(p => p.id === pollid);
//         if(poll){ 
//           poll.options[optionindex].votecount++;
//         }
//       },
//       error: (error) => {
//         console.error("Error on voting polls: ", error);
//       }

//   });
// }
//   trackByIndex(index:number):number{
//     return index;
//   }
    
// }





