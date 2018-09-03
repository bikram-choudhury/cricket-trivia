import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../common/data.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() info:any;
  @Input() slNo:Number;
  @Input() touched:Number[];

  @Output()
  messageEvent = new EventEmitter<any>();

  Qid: Number;
  QTitle: string;
  QOptions: any[];
  selectedOption: string = 'Choose . . .';

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.QTitle = this.info && this.info.ques || '';
    this.Qid = this.info && this.info.id || '';
    this.QOptions = this.info && this.info.options || [];
    
    this._data.current_message
    .subscribe(change => this.selectedOption = 'Choose . . .');
  }

  setAnswer(ans:any) {
    if (ans) {
      this.selectedOption = ans;
      this.messageEvent.emit({sAns: ans, Qid: this.Qid});
    }
  }

}
