import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  private paymentId!: number;
  public pdfFileUrl!: string;
  constructor(private studentService: StudentsService, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.paymentId = this.route.snapshot.params['id'];
    this.studentService.getPaymentDetails(this.paymentId).subscribe({
      next : value => {
        let blob:Blob = new Blob([value], {type: 'application/pdf'});
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      }, error : err => {
        console.log(err);
      }
    });
  }

  afterLoadComplete(event: any) {
  }
}
