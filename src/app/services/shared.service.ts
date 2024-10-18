import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private menuObservable$:BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }
  
  get menuObservable(){
    return this.menuObservable$.asObservable();
  }

  set menuObservableData(data: string){
    this.menuObservable$.next(data);
  }
}
