import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private _message = new BehaviorSubject("");
  current_message = this._message.asObservable();
  
  constructor() { }

  change_message(message: string) {
    message && this._message.next(message);
  }
}
