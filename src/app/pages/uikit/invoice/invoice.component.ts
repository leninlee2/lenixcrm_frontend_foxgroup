import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,CardModule,TabsModule,SelectModule,TableModule,CheckboxModule],
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.css',
    providers: [MessageService]
})
export class InvoiceComponent  implements OnInit {
    
    selectedPipeline:any;

    ngOnInit(): void {
        
    }

    availablePipelines = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
        { id: 4, name: 'Product 4' },
        { id: 5, name: 'Product 5' },
      ];

      statuses = [
        { name: 'Assisting Clients', code: 'AC' },
        { name: 'Executing', code: 'EX' },
        { name: 'Tasks', code: 'TK' }
      ];

      selectedCity: any = 'AC';
    
      selectedPipelines: any[] = [];

      oportunitiestable = [
        {name:'Test', contact:'4073761652', status:'test', value:'10', owner: 'asdf', created:'adsf', updated:'test', stage:'dddd', tags:'1231232' },
        {name:'Test', contact:'4073761652', status:'test', value:'10', owner: 'asdf', created:'adsf', updated:'test', stage:'dddd', tags:'33333'  }
      ];

      checkedAll: any;
    
      // Triggered when drag starts
      dragStart(item: any) {
        console.log('Drag started:', item);
        this.selectedPipeline = item;
      }
    
      // Triggered when drag ends
      dragEnd() {
        console.log('Drag ended');
      }
    
      // Triggered when a product is dropped into the drop zone
      drop() {
        console.log('Product dropped');
      }
    
      // Function to handle drop logic
      handleDrop(event: any) {
        
        this.selectedPipelines.push(this.selectedPipeline);
        // Optionally, remove from availableProducts
        this.availablePipelines = this.availablePipelines.filter(
          (item) => item.id !== this.selectedPipeline.id
        );
      }


    constructor(private service: MessageService) {}

    
}
