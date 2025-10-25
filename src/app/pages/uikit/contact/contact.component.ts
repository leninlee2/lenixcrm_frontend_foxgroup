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
import { CustomerService } from '../../service/customer.service';
import { CustomerDTO } from '../../../dto/customerdto';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    providers: [MessageService]
})
export class ContactComponent  implements OnInit {
    
    selectedPipeline:any;
    customers:CustomerDTO[] = [];
    openContact:boolean = false;
    customer:CustomerDTO = new CustomerDTO(0,'','','','',new Date(),'',new Date());

    ngOnInit(): void {
      this.getAllCustomers();
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

    checkedAll: any;

    openNewContact(){
      this.customer = new CustomerDTO(0,'','','','',new Date(),'',new Date());
      this.openContact = true;
    }

    addContact(){

    }

    editOrSave(){
      if(this.customer.id==0){
        this.customerService.AddCustomers(this.customer).subscribe(
          response => {
            this.openContact = false;
            this.getAllCustomers();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.customerService.UpdateCustomers(this.customer).subscribe(
          response => {
            this.openContact = false;
            this.getAllCustomers();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }
     
    openEdit(customer:CustomerDTO){
      this.customer = customer;
      this.openContact = true;
    }
      
    constructor(private service: MessageService, private customerService: CustomerService) {}

    
}
