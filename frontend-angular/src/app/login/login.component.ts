import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // Declare loginForm variable of type FormGroup
  public loginForm! : FormGroup;

  // Constructor to inject dependencies (FormBuilder, AuthService, Router)
  constructor(private fb : FormBuilder,private authService:AuthService,
              private router: Router) {
  }
  ngOnInit(): void {
    // Initialize login form with form controls for username and password
    this.loginForm = this.fb.group({
      username: this.fb.control(''), // Initialize with empty value
      password: this.fb.control('') // Initialize with empty value
    })
  }

  // Method to handle login process
  login() {
    // Get username and password from login form
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    // Call login method from AuthService to authenticate user
    let auth:boolean = this.authService.login(username, password);

    // Redirect to admin area if authentication is successful
    if(auth==true){
      this.router.navigateByUrl("/admin");
    }
  }
}
