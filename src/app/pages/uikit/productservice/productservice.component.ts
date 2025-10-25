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
import { FinancialControlDTO } from '../../../dto/financialcontroldto';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { SalesIncomeDTO } from '../../../dto/salesincomedto';
import { SalesService } from '../../service/sales.service';
import { SalesCommisionGeneralDTO } from '../../../dto/salescommisiongeneraldto';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomerService } from '../../service/customer.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { ProductService } from '../../service/product.service';
import { ProductServiceDTO } from '../../../dto/productservicedto';

@Component({
    selector: 'app-product-service',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './productservice.component.html',
    styleUrl: './productservice.component.css',
    providers: [MessageService]
})
export class ProductServiceComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    selectedPipeline:any;
    productServices:ProductServiceDTO[] = [];
    filteredCustomers:CustomerDTO[] = [];
    openContact:boolean = false;
    productServiceDTO:ProductServiceDTO = new ProductServiceDTO(0,'',0,new Date(),true,0);
    financialControls:FinancialControlDTO[] = [];
    financialControl:FinancialControlDTO = new FinancialControlDTO(0,0,'',false,0,0,'',0,new Date(),true);
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
    salesGeneralControls:SalesCommisionGeneralDTO[] = [];

    ngOnInit(): void {
      this.getAllProductServices();
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'', '' );
    }

    resetProductService(){
      this.productServiceDTO = new ProductServiceDTO(0,'',0,new Date(),true,0);
    }

    getColspan(){
      return this.salesGeneralControl.isManager?5:4;
    }

    editProductService(item:ProductServiceDTO){
      this.productServiceDTO=item;
    }

    selectSalesman(name:string){
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].name == name){
          this.salesman = this.salesmans[i];
        }
      }

      console.log(this.salesman);
    }

    selectManager(name:string){
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].name == name){
          this.manager = this.salesmans[i];
        }
      }

      console.log(this.salesman);
    }

    getAllGeneralSales(){
      this.salesService.GetSaleComissionGeneral(this.salesGeneralControl.datePeriod).subscribe(
        response => {
          this.salesGeneralControls = response;
          console.log(this.salesGeneralControls);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addProductService(){
      
      if(this.productServiceDTO.id == 0){
        this.productService.Add(this.productServiceDTO).subscribe(
          response => {
            this.getAllProductServices();
            this.resetProductService();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.productService.Update(this.productServiceDTO).subscribe(
          response => {
            this.getAllGeneralSales();
            this.resetProductService();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }

    getStateGeneralControl(){
      return this.productServiceDTO.id > 0? 'Edit': 'Save';
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

    addSalesmanCommision(){
      if(this.salesCommision.id == 0){
        this.salesService.AddSalesIncome(this.salesCommision).subscribe(
          response => {
            this.getAllSalesIncome();
            this.clearSalesCommision();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.salesService.UpdateValueIncome(this.salesCommision).subscribe(
          response => {
            this.getAllSalesIncome();
            this.clearSalesCommision();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
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

    getButtonLabel(){
      return this.financialControl.id > 0? "Edit": "Save";
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

    getAllProductServices(){
      this.productService.GetProductServices().subscribe(
        response => {
          this.productServices = response;
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

    inactiveProductService(row:ProductServiceDTO){
      this.productService.Inactive(row).subscribe(
        response => {
          this.getAllProductServices();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private salesService:SalesService
      ,private customerService: CustomerService, private productService: ProductService
    ) {}

    
}