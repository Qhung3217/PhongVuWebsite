import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error;
  isAlert = false;
  payload = {
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'male',
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value, this.payload);
    this.isLoading = true;
    this.authService.register({ ...this.payload }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/authenticate']);
      },
      error: (errMess) => {
        this.isLoading = false;
        this.error = { type: 'error', message: errMess };
        this.isAlert = true;
      },
    });
  }
}
