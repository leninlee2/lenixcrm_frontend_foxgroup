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
import { ChatWoot, ChatWinDownload, ChatGuacamole , TSPlus } from '../../service/constants';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-chatwoot',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,CardModule
      ,AvatarModule,AvatarGroupModule,SelectModule],
    templateUrl: './chatwoot.component.html',
    styleUrl: './chatwoot.component.css',
    providers: [MessageService]
})
export class ChatWootComponent implements OnInit {

    cookie: CookieService;
    urlChat:string = TSPlus;
    urlFinalChat:string = '';
    iframeUrl: SafeResourceUrl | null = null;

    constructor(private cookieService: CookieService,private sanitizer: DomSanitizer) {
      this.cookie = cookieService;
      
    }

    ngOnInit(): void {
      //this.openExternalChat();
      //window.location.href='/uikit/pipeline';
      let email = this.cookie.get('email');
      var userName = email;
      var password = '123Mudar@';

      if(userName.indexOf('@') >= 0){
        userName = userName.split('@')[0];
      }

      if(userName.toLowerCase().indexOf('administrator') >= 0){
        password = '123Mudar#';
      }

      this.urlFinalChat = this.urlChat.replace('{userName}',userName);
      this.urlFinalChat = this.urlFinalChat.replace('{password}',password);
      console.log(this.urlFinalChat);
      //console.log(email);
      //this.urlFinalChat = this.urlChat + 'client?username=' + email + '&password=123Mudar@'
      //console.log(this.urlFinalChat);
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlFinalChat);
      console.log('load iframe');
    }

    openExternalChat(){
      //window.open('https://168.100.239.165/rdweb/pages',//this.urlFinalChat,
      //  'ChatwootDashboard',
      //  'width=1000,height=2000,resizable=yes,scrollbars=yes');
    }

    downloadChatForWindows(){
      //const link = document.createElement('a');
      //Trindade:
      //link.href = 'https://drive.google.com/file/d/1qxdN0DP4I7__-b9_LON5SA2-D8zmm0S8/view?usp=sharing';
      //Port Saint Lucie:
      //link.href = 'https://drive.google.com/file/d/1pY-6wKCMLRY7WJ_Ns_rS8rCp0dnJha0G/view?usp=sharing';
      //link.href = ChatWinDownload;
      //link.download = 'chatForWindows.zip';     // Suggested filename
      //link.click();
    }
}
