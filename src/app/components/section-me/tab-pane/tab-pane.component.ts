import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AvatarService } from 'src/app/core/services/avatar.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss'],
})
export class TabPaneComponent implements OnInit, OnDestroy {
  userInfor: User;
  userSub: Subscription;
  isChangeAvatar = false;
  loading = {
    upload: false,
    changeAvatar: false,
  };
  avatar;
  isAlert = false;
  toast;
  constructor(
    private userService: UserService,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.userInfor = this.userService.getOwnProfile();
    this.avatar = this.userInfor?.avatar;
    this.userSub = this.userService.userChanged.subscribe((user) => {
      this.userInfor = user;
      this.avatar = this.userInfor?.avatar;
    });
  }
  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
  onChangeAvatar() {
    this.loading.changeAvatar = true;
    this.userService.updateProfile({ avatar: this.avatar }).subscribe(() => {
      this.loading.changeAvatar = false;
      this.isChangeAvatar = false;
    });
  }
  onUploadImage(event) {
    const filesList: FileList = event.target.files;
    const file = filesList[0];
    console.log('ss', file);
    this.loading.upload = true;
    this.avatarService.uploadImage(file).subscribe({
      next: (image) => {
        this.loading.upload = false;
        this.avatar = image.url;
      },
      error: (errorRes: HttpErrorResponse) => {
        if (errorRes?.error && errorRes?.error?.error) {
          this.toast = {
            type: 'error',
            message: errorRes.error.message,
          };
          this.isAlert = true;
        }
        this.loading.upload = false;
      },
    });
  }
}
