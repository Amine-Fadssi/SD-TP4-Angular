import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable() // Marks this class as Injectable
export class AuthGuard {
  // Constructor to inject dependencies
  constructor(private authService:AuthService,
              private router:Router) {
  }

  // Method to determine if a route can be activated
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // Check if user is authenticated
    if(this.authService.isAuthenticated){
      return true; // Allow navigation to the route
    } else {
      // Redirect to login page if user is not authenticated
      this.router.navigateByUrl("/login");
      return false; // Prevent navigation to the route
    }
  }

}
