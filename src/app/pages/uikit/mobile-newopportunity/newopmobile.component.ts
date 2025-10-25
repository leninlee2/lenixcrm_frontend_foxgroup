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
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaymentService } from '../../service/payment.service';
import { CookieService } from 'ngx-cookie-service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { PipelineService } from '../../service/pipeline.service';

@Component({
    selector: 'app-newop-mobile',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './newopmobile.component.html',
    styleUrl: './newopmobile.component.css',
    providers: [MessageService]
})
export class NewOpMobileComponent  implements OnInit {
    id: string | null = null;
    cookie: CookieService;
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    step:number = 0;
    generalWarnMessage:boolean = false;
    generalMessage:string = '';

    ngOnInit(): void {
      
    }

    next(){
        this.step+=1;
    }

    saveOpportunity(){
        this.pipelineService.Add(this.opportunity).subscribe(
          response => {
            this.generalMessage = 'The Opportunity was created';
            this.generalWarnMessage = true;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    closeScreen(){
        window.location.href='/uikit/mobilehome';
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private pipelineService: PipelineService
      ,private paymentService: PaymentService,private cookieService: CookieService
    ) {
      this.cookie = cookieService;
    }

    
}
