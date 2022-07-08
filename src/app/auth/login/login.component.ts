import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error;
  isAlert = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value['email']);
    this.isLoading = true;
    this.authService
      .login(loginForm.value['email'], loginForm.value['password'])
      .subscribe({
        next: () => (this.isLoading = false),
        error: (errMess) => {
          this.isLoading = false;
          this.error = { type: 'error', message: errMess };
          this.isAlert = true;
        },
      });
  }
}
