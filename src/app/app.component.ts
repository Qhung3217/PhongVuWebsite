import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;

  loadingSpinnerSub: Subscription;
  constructor(private loadingSpinnerService: LoadingSpinnerService) {}
  ngOnInit() {
    this.isLoading = this.loadingSpinnerService.isLoading;
    this.loadingSpinnerService.isLoadingChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
  ngOnDestroy(): void {
    if (this.loadingSpinnerSub) this.loadingSpinnerSub.unsubscribe();
  }
  onActivate(event) {
    this.loadingSpinnerService.turnOf();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
