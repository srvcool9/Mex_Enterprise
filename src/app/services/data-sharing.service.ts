import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private activeButtonSubject = new BehaviorSubject<string>('home');
  activeButton$ = this.activeButtonSubject.asObservable();
  constructor() { }


  setActiveButton(button: string) {
    this.activeButtonSubject.next(button);
  }

  getActiveButton() {
    return this.activeButtonSubject.asObservable();
  }

}
