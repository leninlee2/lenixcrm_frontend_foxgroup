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
import { PaymentService } from '../../service/payment.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mobile-home',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule
    ],
    templateUrl: './mobilehome.component.html',
    styleUrl: './mobilehome.component.css',
    providers: [MessageService]
})
export class MobileHomeComponent  implements OnInit {
    id: string | null = null;
    cookie: CookieService;

    ngOnInit(): void {
      
    }

    newOpportunity(){
      window.location.href='/uikit/newopmobile';
    }

    searchOpportunity(){
      window.location.href='/uikit/searchmobile';
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private salesService:SalesService
      ,private paymentService: PaymentService,private cookieService: CookieService
    ) {
      this.cookie = cookieService;
    }

    
}
