import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss'],
})
export class TabPaneComponent implements OnInit, OnDestroy {
  userInfor: User;
  userSub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userInfor = this.userService.getOwnProfile();

    this.userSub = this.userService.userChanged.subscribe((user) => {
      this.userInfor = user;
    });
  }
  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
