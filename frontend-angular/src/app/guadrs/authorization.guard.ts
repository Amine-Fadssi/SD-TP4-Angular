import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable() // Marks this class as Injectable
export class AuthorizationGuard{

  // Constructor to inject AuthService
  constructor(private authService:AuthService) {
  }

  // Method to determine if a route can be activated based on user roles
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // Get required roles for the route from route data
    let requiredRoles = route.data['roles'];
    // Get roles of the authenticated user from AuthService
    let usersRoles = this.authService.roles;
    // Check if any of the user's roles match the required roles for the route
    for(let role of usersRoles){
      if(requiredRoles.includes(role)){
        return true; // Allow navigation to the route
      }
    }
    return false; // Prevent navigation to the route if user doesn't have required roles
  }

}
