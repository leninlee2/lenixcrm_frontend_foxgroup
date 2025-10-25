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
import { SalesIncomeDTO } from '../../../dto/salesincomedto';
import { SalesService } from '../../service/sales.service';
import { SalesCommisionGeneralDTO } from '../../../dto/salescommisiongeneraldto';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomerService } from '../../service/customer.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { ProductService } from '../../service/product.service';
import { GeneralSaleDTO } from '../../../dto/generalsaledto';
import { ProductServiceDTO } from '../../../dto/productservicedto';

@Component({
    selector: 'app-general-sale',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './generalsales.component.html',
    styleUrl: './generalsales.component.css',
    providers: [MessageService]
})
export class GeneralSalesComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    selectedPipeline:any;
    customers:CustomerDTO[] = [];
    filteredCustomers:CustomerDTO[] = [];
    openContact:boolean = false;
    customer:CustomerDTO = new CustomerDTO(0,'','','','',new Date(),'',new Date());
    finalValue:number = 0;
    valueSalesmanCommision:number = 0;
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
    generalSale:GeneralSaleDTO = new GeneralSaleDTO(0,0,0,0,0,0,0,0,new Date(),new Date(),'',new Date(),true,false,false);
    generalSales:GeneralSaleDTO[] = [];
    productServices:ProductServiceDTO[] = [];
    filteredProductServices:ProductServiceDTO[] = [];
    productItem: ProductServiceDTO = new ProductServiceDTO(0,'',0,new Date(),true,0);
    productName:string = '';
    customerName:string = '';
    salesName:string = '';

    ngOnInit(): void {
      this.getAllCustomers();
      this.getAllSalesman();
      this.getAllGeneralSales();
      this.getAllProducts();
    }

    resetGeneralSale(){
      this.generalSale = new GeneralSaleDTO(0,0,0,0,0,0,0,0,new Date(),new Date(),'',new Date(),true,false,false);
      this.productName = '';
      this.customerName = '';
    }

    editSalesGeneral(item:GeneralSaleDTO){
      this.generalSale=item;
      var dateFilter = new Date(item.saleDate);
      var paymentDate = new Date(item.paymentDate);
      this.generalSale.saleDate = new Date(dateFilter.getFullYear(),dateFilter.getMonth(),1);


      this.selectCustomer(item.idCustomer);

      this.selectSalesman(item.idSalesman);

      this.selectProduct(item);
    }

    selectCustomer(idCustomer:number){
      this.customer = this.customers.filter(item =>
        item.id == idCustomer
      )[0];
    }

    selectProduct(sale:GeneralSaleDTO){
      this.productItem = this.productServices.filter(item =>
        item.id == sale.idProduct
      )[0];
      this.productItem.cost = sale.cost;
      this.productItem.unityPrice = sale.unityPrice;
    }

    selectSalesman(idSalesman:number){
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].id == idSalesman){
          this.salesman = this.salesmans[i];
        }
      }

      console.log(this.salesman);
    }

    getAllGeneralSales(){
      this.productService.GetGeneralSales(this.generalSale.saleDate).subscribe(
        response => {
          this.generalSales = response;
          console.log(this.generalSales);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllProducts(){
        this.productService.GetProductServices().subscribe(
          response => {
            this.productServices = response;
            console.log(this.productServices);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }

    addGeneralSale(){

      this.generalSale.idCustomer = this.customer.id;
      this.generalSale.customerName = this.customerName;
      this.generalSale.idSalesman = this.salesman.id;
      this.generalSale.salesman = this.salesName;
      this.generalSale.idProduct = this.productItem.id;
      this.generalSale.productName = this.productName;
      //this.generalSale.unityPrice = this.productItem.unityPrice;
      //this.generalSale.cost = this.productItem.cost;

      console.log(this.generalSale);

      if(this.generalSale.id == 0){
        this.productService.AddGeneralSale(this.generalSale).subscribe(
          response => {
            this.getAllProducts();
            this.getAllSalesman();
            this.getAllCustomers();
            this.getAllGeneralSales();
            this.resetGeneralSale();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.productService.UpdateGeneralSale(this.generalSale).subscribe(
          response => {
            this.getAllProducts();
            this.getAllSalesman();
            this.getAllCustomers();
            this.getAllGeneralSales();
            this.resetGeneralSale();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }

    getStateGeneralControl(){
      return this.generalSale.id > 0? 'Edit': 'Save';
    }

    filterCustomers(event: any) {
      const query = event.query.toLowerCase();
      this.filteredCustomers = this.customers.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      this.customerName = query;
    }

    filterProduct(event: any) {
        this.generalSale.amount = 1;
        const query = event.query.toLowerCase();
        this.filteredProductServices = this.productServices.filter(item =>
          item.name.toLowerCase().includes(query)
        );
        this.productName = query;

        if(this.filteredProductServices.length > 0){
          var item = this.filteredProductServices[0];
          this.generalSale.unityPrice = item.unityPrice;
          this.generalSale.cost = item.cost;
        }        
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
      this.salesName = query;
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

    inactiveSalesGeneral(row:GeneralSaleDTO){
      this.productService.InactiveGeneralSale(row).subscribe(
        response => {
          this.getAllGeneralSales();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private salesService:SalesService
      ,private customerService: CustomerService, private productService:ProductService
    ) {}

    
}
