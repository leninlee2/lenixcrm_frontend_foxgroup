import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit,ElementRef,ViewChild } from '@angular/core';
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
import { FacebookChatPage, WhatsPhoneNumber,SMSPhoneNumber } from '../../service/constants';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,CardModule
      ,AvatarModule,AvatarGroupModule,SelectModule,DialogModule,DatePickerModule,PaginatorModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
    providers: [MessageService]
})
export class ChatComponent implements OnInit, AfterViewInit {
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

    private pingIntervalSeconds = 10; // Set the interval in seconds

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

    @ViewChild('scrollFrom', { static: false }) private myScrollFrom!: ElementRef<HTMLDivElement>;

    warnDeleteChat:boolean = false;

    fromSourceDelete!: FromSourceDTO;

    whatsPhone:string = WhatsPhoneNumber;

    faceId:string = FacebookChatPage;

    pageNumber:number = 1;

    rows:number = 5;

    currentSource:number = -1;

    currentUnread:boolean = false;

    currentSelect:string = 'All';

    recent:boolean = false;

    secondTimer:any;

    checkNewMessages = false;

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

    constructor(private service: MessageService, private integrationService: IntegrationService, private pipelineService: PipelineService) {}

    ngOnInit(): void {
      //means get all messages not readed (top 40), and not recent
      this.getSources(false,1);

      this.pipelineService.GetCategory('').subscribe(
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

      this.secondTimer = setInterval(() => {
        if(this.checkNewMessages){
          this.getLastMessageFrom();
        }
      }, this.pingIntervalSeconds * 1000); // Convert to milliseconds
      
    }

    getSymbol(name:string){
      if(name.length == 0)
        return '/';
      else{
        if(name.indexOf(' ') > 0){
          var parts = name.split(' ');
          if(parts.length >=2){
            return parts[0].substring(0,1) + parts[1].substring(0,1);
          }else{
            return name.substring(0,1);
          }
        }else{
          return name.substring(0,1);
        }
      }
    }

    getCurrentCustomer(){
      if(this.openedChat != null)
        return this.openedChat.from;
      else
        return '<Select a customer>';
    }

    getLastMessageFrom(){
      if(this.fromSources.length > 0){
        
        var lastFilters = this.getLastFilters();

        //console.log('getLastMessageFrom');
        //console.log(lastFilters);
        
        this.integrationService.GetNewLastMessageFrom(lastFilters,this.currentSource).subscribe(
          response => {

            if(this.currentSource != -1)
              response = response.filter(f => f.source == this.currentSource);

            if(response.length > 0){

              console.log(FacebookChatPage);
              response = response.filter(item => 
                  !item.from.toLowerCase().includes(WhatsPhoneNumber.toLowerCase())
                              && !item.from.toLowerCase().includes(FacebookChatPage.toLowerCase())
                              && !item.from.toLowerCase().includes(SMSPhoneNumber.toLowerCase())
              );

              console.log(response);

              this.fromSources = this.fromSources.filter(item => 
                response.filter(ls => ls.from == item.from).length == 0
              );

              this.fromSources.unshift(...response);

            }

            
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
    }

    getLastFilters(){
      var filters = [];

      var item = this.getMaxDate(this.fromSources,0);

      if(item != undefined)
        filters.push(new FromSourceDTO('',0,'','','',0,item,0));

      var item2 = this.getMaxDate(this.fromSources,1);

      if(item2 != undefined)
        filters.push(new FromSourceDTO('',1,'','','',0,item2,0));

      var item3 = this.getMaxDate(this.fromSources,2);

      if(item3 != undefined)
        filters.push(new FromSourceDTO('',2,'','','',0,item3,0));

      var item4 = this.getMaxDate(this.fromSources,3);

      if(item4 != undefined)
        filters.push(new FromSourceDTO('',3,'','','',0,item4,0));

      var item5 = this.getMaxDate(this.fromSources,4);

      if(item5 != undefined)
        filters.push(new FromSourceDTO('',4,'','','',0,item5,0));

      var item6 = this.getMaxDate(this.fromSources,5);

      if(item6 != undefined)
        filters.push(new FromSourceDTO('',5,'','','',0,item6,0));

      //console.log(filters);

      return filters;
    }

    getMaxDate(arr: FromSourceDTO[], source:number): Date | undefined {

      arr = arr.filter(f => f.source == source);

      if (!arr || arr.length === 0) {
        return undefined;
      }

      const maxDate = arr.reduce((max, obj) => {
        return obj.createdDate > max ? obj.createdDate : max;
      }, arr[0].createdDate);

      return maxDate;
    }

    getSourceNumber(){
      if(this.fromSources == null || this.fromSources.length == 0)
        return 0;
      else 
        return this.fromSources[0].total;
    }

    scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
    }

    ngAfterViewInit(): void {
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
      //this.quill.on('keydown', this.handleKeydown.bind(this));
      this.quill.root.addEventListener('keydown', (event: KeyboardEvent) => {
          //console.log('Key pressed:', event.key);
          if(event.key == "Enter"){
            this.addMessage();
          }
      });

      const toolbar = this.quill.getModule('toolbar');

        // Override the default image handler
        toolbar.addHandler('image', () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.setAttribute('multiple', 'true');  // ✅ Multiple selection
          input.click();

          input.onchange = async () => {
            if (input.files) {
              let insertIndex = (this.quill.getSelection(true)?.index ?? this.quill.getLength());

              for (const file of Array.from(input.files)) {
                const base64 = await this.toBase64(file);
                this.quill.insertEmbed(insertIndex, 'image', base64, 'user');
                insertIndex += 1;
              }

              this.quill.setSelection(insertIndex);
            }
          };
        });
      
     }
     
    }

    toBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    handleKeydown(event: KeyboardEvent) {
      console.log('Handle event');
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

    getPageNumber(item:FromSourceDTO){
      return item.numMessages.toString();
    }

    saveNewPipeline(){
      //console.log(this.selectedCategory);
      //console.log(this.selectedPipelinePop);
      var appointment = '';
      if(this.appointment != null){
        appointment = this.appointment.toLocaleString();
      }

      this.savedItem = new OpportunityPipelineDTO(0,this.selectedCategory.id,
        this.selectedPipelinePop.idPipeline,0,this.selectedCategory.name,'', this.customerName
        , this.phone, this.address, this.email,this.details, this.value, this.owner
        ,this.dateFake,this.dateFake, appointment,0,0,0,'', new Date(), '', '');
          
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

    getPageSource(event:any){
       var pageNumber = event.first / event.rows;
       pageNumber += 1;
       //console.log(pageNumber);
       this.getSources(false,pageNumber);
    }

    getChangeSource(source:number,sourceName:string){
      this.currentSource = source;
      this.currentUnread = false;
      this.currentSelect = sourceName;
      this.getSources(false,1);
    }

    getRecent(){
      this.currentSelect = 'Recent';
      this.getSources(true,1);
    }

    getChangeUnread(){
      this.currentUnread = true;
      this.currentSelect = 'UnRead';
      this.getSources(false,1);
    }

    getSources(recent:boolean,pageNumber:number){
      this.integrationService.GetFromChat(this.currentUnread,recent,pageNumber,this.currentSource).subscribe(
        response => {
          this.fromSources = response;
          this.fromSources = this.fromSources.filter(item =>
            !item.from.toLowerCase().includes(WhatsPhoneNumber.toLowerCase())
            && !item.from.toLowerCase().includes(FacebookChatPage.toLowerCase())
            && !item.from.toLowerCase().includes(SMSPhoneNumber.toLowerCase())
          );
          this.checkNewMessages = true;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    appendPage(){
        this.pageNumber += 1;
        this.integrationService.GetFromChat(this.currentUnread,this.recent,this.pageNumber,this.currentSource).subscribe(
        response => {
          var localSources = response;
          localSources = localSources.filter(item =>
            !item.from.toLowerCase().includes(WhatsPhoneNumber.toLowerCase())
            && !item.from.toLowerCase().includes(FacebookChatPage.toLowerCase())
          );

          localSources = localSources.filter(item =>
            this.fromSources.filter(fs => fs.id == item.id && fs.from == item.from).length == 0
          );

          this.fromSources = this.fromSources.filter(item => 
            localSources.filter(ls => ls.from == item.from).length == 0
          );

          this.fromSources.push(...localSources);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openChat(source: FromSourceDTO){
      this.scrollToBottom();
      source.lastMessage = 'New Messages Available';
      this.openedChat = source;
      this.setReadedMessage();
      this.integrationService.GetAllChat(source.from, source.source).subscribe(
        response => {
          this.chatMessages = response;
          //console.log(this.chatMessages);
          this.scrollToBottom();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    setReadedMessage(){
      for(var i = 0;i < this.fromSources.length;i++){
        if(this.fromSources[i].from == this.openedChat.from){
          this.fromSources[i].numMessages = 0;
          this.fromSources.splice(i, 1);
        }
      }
      // Add same object at the beginning:
      this.fromSources.unshift(this.openedChat);
      //this.myScrollFrom.nativeElement.scrollTop = 0;
    }

    getDirection(item:ChatDTO){
      
      if(item.from.indexOf(WhatsPhoneNumber) >= 0
        || item.from.indexOf(FacebookChatPage) >= 0
        || item.from.indexOf(SMSPhoneNumber) >= 0
        || item.from.indexOf('Instagram') >= 0
      ){
        //return 'received';
        return 'sent';
      }

      //return 'sent';
      return 'received b-lblue';
    }

    getDirectionColor(item:ChatDTO){
      if(item.from.indexOf(WhatsPhoneNumber) >= 0
        || item.from.indexOf(FacebookChatPage) >= 0
        || item.from.indexOf(SMSPhoneNumber) >= 0
        || item.from.indexOf('Instagram') >= 0
      ){
        //return 'received';
        return 'lightgray';
      }

      //return 'sent';
      return 'lightblue';
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
      //console.log(this.selectedCategory);
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
          //window.location.reload();
          this.removeVisually(this.fromSourceDelete);
          this.warnDeleteChat = false;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    removeVisually(item:FromSourceDTO){
      this.fromSources = this.fromSources.filter(f =>
        f.from != item.from
      );
    }

    getSender(sender:FromSourceDTO){
      var from = '';
      if(sender.source != 4){
        from = sender.from.length > 20?sender.from.substring(0,20):sender.from;
        return from;
      }   
      else{
        if(sender.from.indexOf(';') > 0){
          from = sender.from.split(';')[1];
          from = from.length > 20?from.substring(0,20):from;
          return from;
        }else{
          from = sender.from.length > 20?sender.from.substring(0,20):sender.from;
          return from;
        }
      }
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
