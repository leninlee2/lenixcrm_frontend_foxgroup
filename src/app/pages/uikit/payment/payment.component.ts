import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SalesService } from '../../service/sales.service';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { PaymentService } from '../../service/payment.service';
import { PaymentDTO } from '../../../dto/paymentdto';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
    providers: [MessageService]
})
export class PaymentComponent  implements OnInit {
    id: string | null = null;
    idSalesman:string = '';
    selectedPipeline:any;
    finalValue:number = 0;
    valueSalesmanCommision:number = 0;
    paymentControl:PaymentDTO = new PaymentDTO(0,'',0,new Date(),0,'','',new Date(),'',0,0,false);
    datePeriod:Date = new Date();
    salesmans:SalesmanDTO[] = [];
    filteredSalesman:SalesmanDTO[] = [];
    filteredManager:SalesmanDTO[] = [];
    salesman:SalesmanDTO = new SalesmanDTO(0,'',1);
    manager:SalesmanDTO = new SalesmanDTO(0,'',1);
    payments:PaymentDTO[] = [];
    isOwner:boolean = false;
    cookie: CookieService;

    ngOnInit(): void {
      this.isOwner = this.cookie.get('isOwner') == "true";

      if(!this.isOwner)
        window.location.href='/';

      this.id = this.route.snapshot.paramMap.get('id');

      if(this.id != null)
        this.idSalesman = this.id;

      this.getAllSalesman();
      this.getAllPayments();
    }

    getTotal(){
      if(this.paymentControl.hasCommission)
        this.paymentControl.total = this.paymentControl.value*(this.paymentControl.commission/100);
      else{
        this.paymentControl.total=this.paymentControl.value;
        this.paymentControl.commission=1;
      }
      return this.paymentControl.total;
    }

    resetPayment(){
      this.paymentControl = new PaymentDTO(0,'',0,new Date(),0,'','',new Date(),'',0,0,false);
    }

    editPayment(item:PaymentDTO){
      this.paymentControl=item;

      if(item.paymentDate != null){
        var dateFilter = new Date(item.paymentDate);

        if(dateFilter.getFullYear() > 1990)
          this.paymentControl.paymentDate = new Date(dateFilter.getFullYear(),dateFilter.getMonth(),dateFilter.getDate());
        else 
          this.paymentControl.paymentDate = null;
      }
      

      //this.selectSalesman(item.idSalesman.toString());
    }

    selectSalesman(idSalesman:string){
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].id.toString() == idSalesman){
          this.salesman = this.salesmans[i];
        }
      }

      console.log(this.salesman);
    }

    getAllPayments(){
      this.paymentService.Get(this.paymentControl.createDate).subscribe(
        response => {
          this.payments = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addPayment(){
      
      this.paymentControl.idSalesman = this.salesman.id;
      this.paymentControl.nameSalesman = this.salesman.name;

      if(this.paymentControl.id == 0){
        this.paymentService.Add(this.paymentControl).subscribe(
          response => {
            this.getAllPayments();
            this.resetPayment();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.paymentService.Update(this.paymentControl).subscribe(
          response => {
            this.getAllPayments();
            this.resetPayment();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }

    getStateGeneralControl(){
      return this.paymentControl.id > 0? 'Edit': 'Save';
    }

    filterManager(event: any) {
      const query = event.query.toLowerCase();
      this.filteredManager = this.salesmans.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    filterSalesman(event: any) {
      const query = event.query.toLowerCase();
      this.filteredSalesman = this.salesmans.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    getAllSalesman(){
      this.salesService.GetSalesman().subscribe(
        response => {
          this.salesmans = response;
          this.selectSalesman(this.idSalesman);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    inactivePayment(row:PaymentDTO){
      this.paymentService.Inactive(row).subscribe(
        response => {
          this.getAllPayments();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private salesService:SalesService
      ,private paymentService: PaymentService,private cookieService: CookieService
    ) {
      this.cookie = cookieService;
    }

    
}
