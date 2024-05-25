import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../Model/students.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!: string;
  studentPayments!: Array<Payment>;
  paymentDataSource! : MatTableDataSource<Payment>;
  public displayedColumns=['id', 'date',
    'amount', 'type', 'status', 'firstName', 'details']; // Columns to be displayed in the table

  constructor(private activatedRoute:ActivatedRoute,
              private studentService:StudentsService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.studentService.getStudentPayment(this.studentCode).subscribe({
      next : value => {
        this.studentPayments = value;
        this.paymentDataSource = new MatTableDataSource<Payment>(this.studentPayments);
      },
      error : err => {
        console.log(err);
      }
    });
  }
  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
  }

  paymentDetails(payment: any) {
    this.router.navigateByUrl(`/admin/payment-details/${payment.id}`)
  }
}
