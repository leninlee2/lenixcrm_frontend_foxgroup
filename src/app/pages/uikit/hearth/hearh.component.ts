import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-hearth-webview',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,CardModule
      ,AvatarModule,AvatarGroupModule,SelectModule],
    templateUrl: './hearth.component.html',
    styleUrl: './hearth.component.css',
    providers: [MessageService]
})
export class HearthComponent implements OnInit {

    constructor() {
      }

    ngOnInit(): void {
      
    }
}
