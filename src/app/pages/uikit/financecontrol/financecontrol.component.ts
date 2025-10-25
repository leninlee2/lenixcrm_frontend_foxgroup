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
import { FinancialService } from '../../service/financial.service';
import { FinancialControlDTO } from '../../../dto/financialcontroldto';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';

@Component({
    selector: 'app-finance-control',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule],
    templateUrl: './financecontrol.component.html',
    styleUrl: './financecontrol.component.css',
    providers: [MessageService]
})
export class FinanceControlComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    selectedPipeline:any;
    customers:CustomerDTO[] = [];
    openContact:boolean = false;
    customer:CustomerDTO = new CustomerDTO(0,'','','','',new Date(),'',new Date());
    financialControls:FinancialControlDTO[] = [];
    financialControl:FinancialControlDTO = new FinancialControlDTO(0,0,'',false,0,0,'',0,new Date(),true);
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    finalValue:number = 0;

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.idOpportunity = Number(this.id);
      this.financialControl.idOpportunity = this.idOpportunity;
      console.log('ID:', this.id);
      this.getOpportunity();
      this.getFinancialService();
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'', '' );
    }

    resetControl(){
      this.financialControl = new FinancialControlDTO(0,0,'',false,0,0,'',0,new Date(),true);
    }

    getOpportunity(){
      this.pipelineService.GetSingleOpportunity(this.idOpportunity).subscribe(
        response => {
          this.opportunity = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getFinancialService(){
      this.financialService.Get(this.idOpportunity).subscribe(
        response => {
          this.financialControls = response;

          if(this.financialControl != null && this.financialControls.length > 0){
            this.finalValue = this.financialControls[this.financialControls.length-1].balance;
          }
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openNewContact(){
      this.customer = new CustomerDTO(0,'','','','',new Date(),'',new Date());
      this.openContact = true;
    }

    AddFinancial(){
      if(this.financialControl.id ==0){
        this.financialService.Add(this.financialControl).subscribe(
          response => {
            this.getFinancialService();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.financialService.Update(this.financialControl).subscribe(
          response => {
            this.getFinancialService();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }  
    }

    Inactive(item: FinancialControlDTO){
      this.financialService.Inactive(item).subscribe(
        response => {
          this.getFinancialService();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    fillEdit(item: FinancialControlDTO){
      this.financialControl = item;
    }

    rowClick(item: FinancialControlDTO, event:any){
      var target = event.target as HTMLElement;
      while (target && target.tagName !== 'TD') {
        target = target.parentElement!;
      }

      const td = target as HTMLTableCellElement;
      console.log(item);
      console.log('clicked row');
      console.log(td.cellIndex);

      //5 = edit column:
      if(td.cellIndex == 5){
        this.fillEdit(item);
      }

      //6 = delete column:
      if(td.cellIndex == 6){
        this.Inactive(item);
      }
      event.stopPropagation();
    }

    getButtonLabel(){
      return this.financialControl.id > 0? "Edit": "Save";
    }

    redirectOpportunity(){
      window.location.href='/uikit/pipeline';
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute
      , private financialService:FinancialService, private pipelineService: PipelineService) {}

    
}
