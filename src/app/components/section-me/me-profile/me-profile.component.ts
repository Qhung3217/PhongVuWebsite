import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-me-profile',
  templateUrl: './me-profile.component.html',
  styleUrls: ['./me-profile.component.scss'],
})
export class MeProfileComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isLoading = false;
  error;
  isAlert = false;
  payload = {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'male',
  };
  datePipe: DatePipe = new DatePipe('en-EN');
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const profile = this.userService.getOwnProfile();
    this.assignProfile(profile);
    this.userSub = this.userService.userChanged.subscribe((user) => {
      this.assignProfile(user);
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  assignProfile(profile) {
    this.payload.email = profile?.email;
    this.payload.phone = profile?.phone;
    this.payload.firstName = profile?.firstName;
    this.payload.lastName = profile?.lastName;
    this.payload.gender = profile?.gender;
    if (profile?.dob) {
      const dateDOB = new Date(profile?.dob);
      this.payload.dob = this.datePipe.transform(dateDOB, 'yyyy-MM-dd');
    }
  }

  onSubmit(profileForm: NgForm) {
    console.log(this.payload);
    const objSend = this.removeKeyValueUndefined();
    console.log(objSend);
    this.isLoading = true;
    this.userService.updateProfile({ ...objSend }).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.assignProfile({ ...user });
        this.error = {
          type: 'success',
          message: 'Profile updated successfully',
        };
        this.isAlert = true;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = {
          type: 'error',
          message: 'Something went wrong',
        };
        this.isAlert = true;
      },
    });
  }
  removeKeyValueUndefined() {
    const processObj = { ...this.payload };
    for (let key in processObj)
      if (processObj[key] === undefined) delete processObj[key];
    return { ...processObj };
  }
}
