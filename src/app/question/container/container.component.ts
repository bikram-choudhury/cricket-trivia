import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataService } from '../../common/data.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  questionList:any[];
  result:any[] = [];
  notAnswered:any[];

  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  @Output()
  emitResult = new EventEmitter<any>();

  constructor(private _http: HttpClient, private _data: DataService) { }

  ngOnInit() {
    this._http.get<any[]>('./assets/data/question.json')
    .subscribe(res => {
      this.questionList = res;
    });
  }

  saveAnswer(data: any) {
    
    const isExist = this.result.length && this.result.findIndex(r => r.id === data.Qid);
    if (isExist > -1) {
      this.result.splice(isExist, 1);
    }
    const QObj = this.questionList.find(ques => ques.id === data.Qid);
    const Qstatus = {
      id: data.Qid,
      status: QObj.cAns === data.sAns ? 'pass' : 'fail'
    };
    this.result.push(Qstatus);
    const isPrevNotAnswered = this.notAnswered && this.notAnswered.findIndex(na => na === data.Qid);
    if (isPrevNotAnswered > -1) {
      this.notAnswered.splice(isPrevNotAnswered, 1);
    }
  }

  submit() {
    this.notAnswered = this.questionList.filter(ques => this.result.findIndex(r => r.id === ques.id) === -1 )
    .map(({id}) => id);

    if (this.notAnswered.length === 0) {
      this.emitResult.emit(this.result);
    }
  }

  clear() {
    this.notAnswered = [];
    this.result = [];
    this._data.change_message("clear");
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
