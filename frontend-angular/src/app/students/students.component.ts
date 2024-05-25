import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Student} from "../Model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  students !: Array<Student>;
  public studentDataSource!: MatTableDataSource<Student>; // DataSource for MatTable
  public displayedColumns=['id', 'firstName',
    'lastName', 'code', 'programId', 'payments']; // Columns to be displayed in the table

  constructor(private studentsService:StudentsService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.studentsService.getStudents().subscribe({
      next : value => {
        this.students = value;
        this.studentDataSource = new MatTableDataSource<Student>(this.students);
      },
      error : err => {
        console.log(err);
      }
    })
  }

  studentPayment(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }
}
