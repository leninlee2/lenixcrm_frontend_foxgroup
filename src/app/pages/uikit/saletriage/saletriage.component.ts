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
import { CustomerDTO } from '../../../dto/customerdto';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { SalesIncomeDTO } from '../../../dto/salesincomedto';
import { SalesService } from '../../service/sales.service';
import { SalesCommisionGeneralDTO } from '../../../dto/salescommisiongeneraldto';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomerService } from '../../service/customer.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { SalesCommissionTriageDTO } from '../../../dto/salescommissiontriagedto';

@Component({
    selector: 'app-sale-triage',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './saletriage.component.html',
    styleUrl: './saletriage.component.css',
    providers: [MessageService]
})
export class SaleTriageControlComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    selectedPipeline:any;
    customers:CustomerDTO[] = [];
    filteredCustomers:CustomerDTO[] = [];
    openContact:boolean = false;
    customer:CustomerDTO = new CustomerDTO(0,'','','','',new Date(),'',new Date());
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    finalValue:number = 0;
    openSalesCommission:boolean = false;
    openSalesManagerCommission:boolean = false;
    valueSalesmanCommision:number = 0;
    salesCommision:SalesIncomeDTO = new SalesIncomeDTO(0,0,0,new Date(),true);
    salesManagerCommision:SalesIncomeDTO = new SalesIncomeDTO(0,0,0,new Date(),true);
    salesIncomes:SalesIncomeDTO[] = [];
    salesManagerIncomes:SalesIncomeDTO[] = [];
    salesGeneralControl:SalesCommisionGeneralDTO = new SalesCommisionGeneralDTO(0,0,0,new Date(),true,'','',0,false,new Date(),0,0,'','',0,0);
    datePeriod:Date = new Date();
    salesmans:SalesmanDTO[] = [];
    filteredSalesman:SalesmanDTO[] = [];
    filteredManager:SalesmanDTO[] = [];
    salesman:SalesmanDTO = new SalesmanDTO(0,'',1);
    manager:SalesmanDTO = new SalesmanDTO(0,'',1);
    saleCommissionTriages:SalesCommissionTriageDTO[] = [];
    salesCommissionTriage:SalesCommissionTriageDTO = new SalesCommissionTriageDTO(0,0,0,0,0,'','',0,new Date(),true
  ,'',0,'',0,new Date());

    ngOnInit(): void {
      this.getAllCustomers();
      this.getAllSalesman();
      this.getAllTriage();
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'', '' );
    }

    resetTriage(){
      this.salesCommissionTriage = new SalesCommissionTriageDTO(0,0,0,0,0,'','',0,new Date(),true
      ,'',0,'',0,new Date());
    }

    editSalesTrial(item:SalesCommissionTriageDTO){
      this.salesCommissionTriage=item;
      var dateFilter = new Date(item.datePeriod);
      this.salesGeneralControl.datePeriod = new Date(dateFilter.getFullYear(),dateFilter.getMonth(),1);

      this.selectCustomer(item.idCustomer);
      this.selectSalesman(item.salesman);
    }

    selectCustomer(idCustomer:number){
      this.customer = this.customers.filter(item =>
        item.id == idCustomer
      )[0];
    }

    selectSalesman(name:string){
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].name == name){
          this.salesman = this.salesmans[i];
        }
      }

      console.log(this.salesman);
    }

    getAllTriage(){
      this.salesService.GetSaleTriage(this.salesGeneralControl.datePeriod).subscribe(
        response => {
          this.saleCommissionTriages = response;
          console.log(this.saleCommissionTriages);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addSaleTriage(){
      
      this.salesCommissionTriage.idCustomer = this.customer.id;
      this.salesCommissionTriage.customer = this.customer.name;
      this.salesCommissionTriage.idSalesman = this.salesman.id;
      this.salesCommissionTriage.salesman = this.salesman.name;
      console.log(this.salesCommissionTriage);
      if(this.salesCommissionTriage.id == 0){
        this.salesService.AddSalesTriage(this.salesCommissionTriage).subscribe(
          response => {
            this.getAllTriage();
            this.resetTriage();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.salesService.UpdateSalesTriage(this.salesCommissionTriage).subscribe(
          response => {
            this.getAllTriage();
            this.resetTriage();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }

    getStateGeneralControl(){
      return this.salesGeneralControl.id > 0? 'Edit': 'Save';
    }

    filterCustomers(event: any) {
      const query = event.query.toLowerCase();
      this.filteredCustomers = this.customers.filter(item =>
        item.name.toLowerCase().includes(query)
      );
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

    openSalesIncome(){
      this.getAllSalesIncome();
      this.openSalesCommission = true;
    }

    openManagerIncome(){
      this.getAllManagerIncome();
      this.openSalesManagerCommission = true;
    }

    addManagerCommision(){
      if(this.salesManagerCommision.id == 0){
        this.salesService.AddManagerIncome(this.salesManagerCommision).subscribe(
          response => {
            this.getAllManagerIncome();
            this.clearManagerCommision();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.salesService.UpdateValueManagerIncome(this.salesManagerCommision).subscribe(
          response => {
            this.getAllManagerIncome();
            this.clearManagerCommision();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    getAllSalesIncome(){
      this.salesService.GetSalesIncomes().subscribe(
        response => {
          this.salesIncomes = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllManagerIncome(){
      this.salesService.GetManagerIncomes().subscribe(
        response => {
          this.salesManagerIncomes = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    updateOrderIncome(salesIncome:SalesIncomeDTO){
      this.salesService.UpdateOrderIncome(salesIncome).subscribe(
        response => {
          this.getAllSalesIncome();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    updateOrderManagerIncome(salesIncome:SalesIncomeDTO){
      this.salesService.UpdateOrderManagerIncome(salesIncome).subscribe(
        response => {
          this.getAllManagerIncome();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deleteSalesIncome(salesIncome:SalesIncomeDTO){
      this.salesService.InactivateSalesIncome(salesIncome).subscribe(
        response => {
          this.getAllSalesIncome();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deleteSalesManagerIncome(salesIncome:SalesIncomeDTO){
      this.salesService.InactivateSalesManagerIncome(salesIncome).subscribe(
        response => {
          this.getAllManagerIncome();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    editSalesIncome(salesIncome:SalesIncomeDTO){
      this.salesCommision = salesIncome;
    }

    editSalesManagerIncome(salesIncome:SalesIncomeDTO){
      this.salesManagerCommision = salesIncome;
    }

    clearSalesCommision(){
      this.salesCommision = new SalesIncomeDTO(0,0,0,new Date(),true);
    }

    clearManagerCommision(){
      this.salesManagerCommision = new SalesIncomeDTO(0,0,0,new Date(),true);
    }

    getNameButtonIncome(){
      return this.salesCommision.id > 0?'Edit':'Save';
    }

    getNameManagerButtonIncome(){
      return this.salesManagerCommision.id > 0?'Edit':'Save';
    }

    getAllCustomers(){
      this.customerService.GetAllCustomers().subscribe(
        response => {
          this.customers = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllSalesman(){
      this.salesService.GetSalesman().subscribe(
        response => {
          this.salesmans = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    inactiveSalesTriage(row:SalesCommissionTriageDTO){
      this.salesService.InactivateSalesTriage(row).subscribe(
        response => {
          this.getAllTriage();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private salesService:SalesService
      ,private customerService: CustomerService
    ) {}

    
}
