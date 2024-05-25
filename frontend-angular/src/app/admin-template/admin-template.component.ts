import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  // Constructor to initialize the component with AuthService
  constructor(public authService: AuthService) {
  }
  // Method to handle user logout
  logout() {
    this.authService.logout();
  }
}
