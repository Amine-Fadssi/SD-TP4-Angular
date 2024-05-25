import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guadrs/auth.guard";
import {AuthorizationGuard} from "./guadrs/authorization.guard";
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";

const routes: Routes = [
  // Default route to LoginComponent
  {path: "", component: LoginComponent},
  // Route to LoginComponent
  {path: "login", component: LoginComponent},
  // Routes for authenticated admin area
  {
    // Base path for admin area
    path: "admin",
    component: AdminTemplateComponent, // Main template for admin area
    canActivate : [AuthGuard], // Guard to ensure authentication before accessing admin area
    children : [
      // Child routes for admin area
      {path: "home", component: HomeComponent},
      {path: "profile", component: ProfileComponent},
      // Routes for loading students and payments, accessible only to ADMIN role
      {
        path: "loadStudents", component: LoadStudentsComponent,
        canActivate: [AuthorizationGuard], // Guard to check authorization based on roles
        data : {roles: ['ADMIN']} // Data specifying required roles for authorization
      },
      {
        path: "loadPayments", component: LoadPaymentsComponent,
        canActivate: [AuthorizationGuard], // Guard to check authorization based on roles
        data : {roles: ['ADMIN']} // Data specifying required roles for authorization
      },
      // Routes for other admin dashboard components
      {path: "dashboard", component: DashboardComponent},
      {path: "students", component: StudentsComponent},
      {path: "payments", component: PaymentsComponent},
      {path: "student-details/:code", component: StudentDetailsComponent},
      {path: "new-payment/:studentCode", component: NewPaymentComponent},
      {path: "payment-details/:id", component: PaymentDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
