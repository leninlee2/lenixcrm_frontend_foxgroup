import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenChatService {
  private openChatSource = new BehaviorSubject<boolean>(false);
  openChatValue$ = this.openChatSource.asObservable();

  setFlag(value: boolean) {
    this.openChatSource.next(value);
  }
}
