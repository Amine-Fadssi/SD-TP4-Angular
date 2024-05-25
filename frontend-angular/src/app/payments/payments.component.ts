import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments: any; // Variable to store payments data
  public dataSource: any; // DataSource for MatTable
  public displayedColumns=['id', 'date',
    'amount', 'type', 'status', 'firstName']; // Columns to be displayed in the table

  @ViewChild(MatPaginator) paginator!:MatPaginator; // Reference to MatPaginator
  @ViewChild(MatSort) sort!:MatSort; // Reference to MatSort

  // Constructor to inject HttpClient
  constructor(private studentService:StudentsService) {
  }
  ngOnInit(): void {
    // Fetch payments data from backend
    this.studentService.getAllPayments()
      .subscribe({
        next : data => {
          this.payments = data; // Assign payments data to local variable

          // Create MatTableDataSource using payments data
          this.dataSource = new MatTableDataSource(this.payments);

          // Assign references of MatPaginator and MatSort to MatTableDataSource
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : err => {
          console.log(err); // Log error if HTTP request fails
        }
      })
  }

}
