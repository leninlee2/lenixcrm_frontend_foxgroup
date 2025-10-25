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
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,CardModule,TabsModule,SelectModule,TableModule],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css',
    providers: [MessageService]
})
export class LogoutComponent  implements OnInit {
    
    ngOnInit(): void {
        
    }

    constructor(private service: MessageService,private cookieService: CookieService) {

        this.cookieService.delete('token','/');
        window.location.href='/';

    }

    
}
