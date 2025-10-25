import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit,ElementRef,ViewChild,inject,Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import Quill from 'quill';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { IntegrationService } from '../../service/integration.service';
import { FromSourceDTO } from '../../../dto/fromsourcedto';
import { ChatDTO } from '../../../dto/chatdto';
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { OpportunityDTO } from '../../../dto/opportunitydto';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-chat-webview',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,CardModule
      ,AvatarModule,AvatarGroupModule,SelectModule,DialogModule,DatePickerModule],
    templateUrl: './chatwebview.component.html',
    styleUrl: './chatwebview.component.css',
    providers: [MessageService]
})
export class ChatWebViewComponent implements OnInit, AfterViewInit {
    msgs: ToastMessageOptions[] | null = [];

    username: string | undefined;

    email: string = '';

    quill: any;

    fromSources: FromSourceDTO[] = [];

    chatMessages: ChatDTO[] = [];

    openedChat!:FromSourceDTO;

    editorMessage:string = '';

    editor:any;

    private pingInterval: any;

    private pingIntervalSeconds = 5; // Set the interval in seconds

    savedItem!:OpportunityPipelineDTO;

    openPipeline:boolean = false;

    dateFake:Date = new Date();

    value:number = 0;

    owner:string = '';

    address:string = '';

    phone:string = '';

    details:string = '';

    customerName:string = '';

    selectedPipelinePop:any;

    availablePipelines:OpportunityDTO[] = [];

    selectedCategoryPop:any;

    selectedCategory:any;

    statuses:any;

    appointment!:string;

    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    warnDeleteChat:boolean = false;

    fromSourceDelete!: FromSourceDTO;

    bindings = {
      enter: {
        key: 13,
        handler: function() {
          console.log('enter pressed');
          //this.hideSymbols = !this.hideSymbols;
          //console.log(this.hideSymbols);
        }
      }
    };

    safeUrl!: SafeResourceUrl;
    externalContent:string = 'https://lenixcrm-expressov1-ee495053eabf.herokuapp.com/uikit/dashboard';// 'https://m.me/fpo.trindade';

    private elRef = inject(ElementRef);

    @ViewChild('chatContainer', { static: true }) chatContainer!: ElementRef;

    constructor(private service: MessageService, private integrationService: IntegrationService
      , private pipelineService: PipelineService,private sanitizer: DomSanitizer,private renderer: Renderer2) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.externalContent);
      }

    ngOnInit(): void {
      const id = 'Messenger';

      if (!document.getElementById(id)) {
        const script = this.renderer.createElement('script');
        script.id = id;
        script.src = 'https://connect.facebook.net/en_US/messenger.Extensions.js';
        script.async = true;
        this.renderer.appendChild(document.body, script);
      }

      /*
      window.addEventListener('fb-sdk-ready', () => {
        // Check if `FB` is available
        if (window.FB) {
          // Dynamically create the <fb:customerchat> element
          const chatEl = document.createElement('fb:customerchat');
          chatEl.setAttribute('page_id', 'YOUR_PAGE_ID');  // Replace with your Page ID
          chatEl.setAttribute('attribution', 'setup_tool');  // Optional: Add attribution
          chatEl.setAttribute('theme_color', '#0084FF');  // Optional: Change theme color
  
          // Append the chat element to the container
          this.chatContainer.nativeElement.appendChild(chatEl);
  
          // Parse the XFBML element to initialize the Messenger plugin
          if (window.FB.XFBML && typeof window.FB.XFBML.parse === 'function') {
            window.FB.XFBML.parse();  // Initialize the Messenger plugin
          } else {
            console.error('FB.XFBML.parse is not available');
          }
        } else {
          console.error('Facebook SDK not loaded or FB is not available');
        }
      });
      */

      /*
      const chatEl = document.createElement('fb:customerchat');
    chatEl.setAttribute('page_id', 'fpo.trindade');
    chatEl.setAttribute('attribution', 'setup_tool');

    this.chatContainer.nativeElement.appendChild(chatEl);

    // Wait for the Facebook SDK to be fully loaded
    window.addEventListener('fb-sdk-ready', () => {
      const FB = (window as any).FB;
      if (FB && FB.XFBML && typeof FB.XFBML.parse === 'function') {
        console.log('it will try load facebook');
        FB.XFBML.parse();
      } else {
        console.error('Facebook SDK loaded, but XFBML is not available.');
      }
    });
      */
      /*
      this.getSources();

      this.pipelineService.GetCategory().subscribe(
        response => {
          this.statuses = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

      this.pingInterval = setInterval(() => {
        if(this.openedChat != null && this.openedChat != undefined){
          this.openChat(this.openedChat);
        }
      }, this.pingIntervalSeconds * 1000); // Convert to milliseconds
      */

      
    }

    scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
    }

    ngAfterViewInit(): void {

      /*
      (window as any).FB.XFBML.parse();

      this.editor = document.getElementById('editor');
       if (this.editor) {
       this.quill = new Quill(this.editor, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['image'],
          ],
          keyboard: {
            bindings: this.bindings
          },
        }
      });

      // Listen for the 'keydown' event using quill.on()
      this.quill.on('keydown', this.handleKeydown.bind(this));
      
     }
     */
     
    }

    handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        console.log('Enter key pressed');
        // You can add custom behavior for the Enter key here
        
        // For example, you can prevent the default behavior (like adding a new line)
        event.preventDefault(); // Prevent the default Enter behavior
      }
    }

    addOpportunityPopup(event:any,source: FromSourceDTO){
      event.stopImmediatePropagation();
      this.customerName = source.from;
      this.openPipeline = true;
    }

    openDeleteChatPopup(event:any,source: FromSourceDTO){
      event.stopImmediatePropagation();
      this.fromSourceDelete = source;
      this.warnDeleteChat = true;
    }

    saveNewPipeline(){
      //console.log(this.selectedCategory);
      //console.log(this.selectedPipelinePop);
      this.savedItem = new OpportunityPipelineDTO(0,this.selectedCategory.id,
        this.selectedPipelinePop.idPipeline,0,this.selectedCategory.name,'', this.customerName
        , this.phone, this.address, this.email,this.details, this.value, this.owner
        ,this.dateFake,this.dateFake, this.appointment.toLocaleString(),0,0,0,'', new Date(), '', '' );
          
            this.pipelineService.Add(this.savedItem).subscribe(
              response => {
                console.log('add the pipeline done');
                //window.location.reload();
                this.closeOpportunity();
              },
              error => {
                console.error('Error:', error);  // Handle the error here
              }
            );
            
    }

    getSources(){
      this.integrationService.GetFromChat(false,false,1,-1).subscribe(
        response => {
          this.fromSources = response;
          console.log(this.fromSources);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openChat(source: FromSourceDTO){
      this.scrollToBottom();
      this.openedChat = source;
      this.integrationService.GetAllChat(source.from, source.source).subscribe(
        response => {
          this.chatMessages = response;
          console.log(this.chatMessages);
          this.scrollToBottom();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getDirection(item:ChatDTO){
      
      if(item.from.indexOf('4155238886') >= 0
        || item.from.indexOf('TesteLenin') >= 0
      ){
        return 'received';
      }

      return 'sent';
    }

    addMessage(){
      this.openedChat.lastMessage = this.quill.root.innerHTML;;
      this.integrationService.AddMessage(this.openedChat).subscribe(
        response => {
          this.quill.root.innerHTML = '';
          this.openChat(this.openedChat);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    closeOpportunity(){
      this.openPipeline = false;
    }

    getCategory(){
      console.log(this.selectedCategory);
      this.getOpportunityPipeline(this.selectedCategory.id);
    }

    getOpportunityPipeline(idCategory:number){
      this.pipelineService.GetOpportunityPipelines(idCategory).subscribe(
        response => {
          this.availablePipelines = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deleteChat(){
      this.pipelineService.InactiveChat(this.fromSourceDelete).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    showInfoViaToast() {
        this.service.add({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaToast() {
        this.service.add({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaToast() {
        this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaToast() {
        this.service.add({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }
}
