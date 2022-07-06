import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class LoadingSpinnerService {
  isLoading = false;
  isLoadingChanged = new Subject<boolean>();
  turnOf() {
    console.log('turnof');
    this.isLoading = false;
    this.isLoadingChanged.next(this.isLoading);
  }
  turnOn() {
    console.log('turnon');

    this.isLoading = true;
    this.isLoadingChanged.next(this.isLoading);
  }
}
