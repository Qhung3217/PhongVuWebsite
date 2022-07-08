import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  constructor() {}

  ngOnInit(): void {}
  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
  }
}
