import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root' // Provides this service at the root injector level
})
export class AuthService {
  // User data stored as key-value pairs (username: {password, roles})
  public users:any = {
    admin : {password : '123', roles : ['STUDENT', 'ADMIN']},
    user1 : {password : '123', roles : ['STUDENT']}
  }
  public username : any; // Current authenticated username
  public isAuthenticated : boolean=false; // Flag to indicate if user is authenticated
  public roles : string[]=[]; // authenticated User roles

  // Constructor to inject Router
  constructor(private router: Router) { }

  // Method to authenticate user
  public login(username: string, password: string):boolean {
    // Check if username exists and password matches
    if(this.users[username] && this.users[username]['password']==password){
      this.username = username; // Set authenticated username
      this.isAuthenticated = true; // Set authentication flag to true
      this.roles = this.users[username]['roles']; // Set user roles

      return true;
    } else {
      return false;
    }
  }

  // Method to logout user
  logout() {
    this.isAuthenticated = false; // Reset authentication flag
    this.roles = []; // Reset user roles
    this.username = undefined; // Reset authenticated username
    this.router.navigateByUrl('/login'); // Redirect to login page
  }
}
