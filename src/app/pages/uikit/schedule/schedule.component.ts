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
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { FileUploadModule } from 'primeng/fileupload';
import { OpportunityFileDTO } from '../../../dto/opportunityfiledto';
import { PipelineDTO } from '../../../dto/pipelinedto';
import { DatePickerModule } from 'primeng/datepicker';
import { ApiUrl } from '../../service/constants';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-schedule',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,FullCalendarModule
      ,FileUploadModule,DatePickerModule],
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.css',
    providers: [MessageService]
})
export class ScheduleComponent  implements OnInit {
    
    calendarOptions: any;
    statuses:any;
    index:string = "0";
    events: any[] = [];
    notes:any[] = [];
    idOpportunity:number = 0;
    note:string = '';
    newPipeline:boolean = false;
    phone:string = '';
    selectedCategory:any;
    editPipeline:boolean = false;
    openPipeline:boolean = false;
    dateFake:Date = new Date();
    appointment!:string;
    value:number = 0;
    details:string = '';
    email:string = '';
    address:string = '';
    customerName:string = '';
    owner:string = '';
    selectedCategoryPop:any;
    savedItem:OpportunityPipelineDTO = this.emptyOpportunity();
    editItem:OpportunityPipelineDTO = this.emptyOpportunity();
    selectedPipelinePop:any;
    idCustomer:number = 0;
    uploadFileData:any;
    pipelinePop:PipelineDTO[] = [];
    fileUrl:string = ApiUrl + '/opportunitypipeline/uploadfile';
    cookie: CookieService;

    /*
    events: any[] = [
        {
            title: 'Doctor Appointment',
            start: '2025-04-20T10:00:00',
            end: '2025-04-20T11:00:00',
            allDay: false
        }
    ];
    */
    displayDialog: boolean = false;
    newEvent: any = { title: '', start: null, description: '' };

    ngOnInit() {
        let email = this.cookie.get('email');
        this.pipelineService.GetCategory(email).subscribe(
            response => {
              this.statuses = response;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
        this.loadCalendarOptions();
        this.getCalendar();
        
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }

    getCalendar(){
        this.pipelineService.GetCalendar().subscribe(
            response => {
              this.events = response;
              this.loadCalendarOptions();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
        );
    }

    loadCalendarOptions(){
        this.calendarOptions = {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            dateClick: (e: any) => this.onDateClick(e),
            eventClick: (e: any) => this.onEventClick(e),
            events: this.events
          };
    }

    onDateClick(event: any) {
        this.newEvent = { title: '', start: event.dateStr, description: '' };
        //this.displayDialog = true;
        this.newPipeline = true;
        this.openPipeline = true;
        this.appointment = event.dateStr;
        this.savedItem = new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
          ,this.dateFake,this.dateFake, event.dateStr,0,0,0,'', new Date(),'','');
        this.notes = [];
      }
    
      onEventClick(event: any) {
        console.log(event.event.id);
        //this.newEvent = { ...event.event.extendedProps, title: event.event.title, start: event.event.startStr };
        //this.displayDialog = true;
        this.openPipeline = true;
        this.editPipeline = true;
        this.getSingleOpportunity(event.event.id);
      }
    
      saveEvent() {
        if (this.newEvent.title) {
          this.events = [...this.events, {
            title: this.newEvent.title,
            start: this.newEvent.start,
            description: this.newEvent.description
          }];
        }
        this.displayDialog = false;
    }

    AddNote(event:any){
        let notesDto = {idOpportunity: this.idOpportunity, note: this.note, id: 0,createdDate: new Date()};
  
        this.pipelineService.AddNote(notesDto).subscribe(
          response => {
            console.log('add the pipeline done');
            this.getNotes(this.idOpportunity);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    getNotes(idOpportunity:number){
        this.pipelineService.GetNotes(idOpportunity).subscribe(
          response => {
            this.notes = response;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    getSingleOpportunity(idOpportunity:number){
        this.notes = [];
        this.pipelineService.GetSingleOpportunity(idOpportunity).subscribe(
          response => {
            console.log('it got the opportunity');
            this.savedItem = response;
            console.log(this.savedItem);
            this.idOpportunity = this.savedItem.id;
            this.getNotes(this.idOpportunity);
            this.selectPipeline();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    selectPipeline(){
      for(var i = 0;i < this.statuses.length;i++){
        if(this.statuses[i].id == this.savedItem.idCategory){
          this.selectedCategoryPop = this.statuses[i];
          this.getTabs(true);
        }
      }
    }

    selectTab(){
      for(var i = 0;i < this.pipelinePop.length;i++){
        if(this.pipelinePop[i].id == this.savedItem.idPipeline){
          this.selectedPipelinePop = this.pipelinePop[i];
        }
      }
    }

    editOrSave(){
        if(this.newPipeline){
          this.saveNewPipeline();
        }else{
          this.editDetailPipeline();
        }
    }

    saveNewPipeline(){
          this.savedItem.idCategory = this.selectedCategoryPop.id;
          this.savedItem.nameCategory = this.selectedCategoryPop.name;
          this.savedItem.idPipeline = this.selectedPipelinePop.id;
          console.log(this.savedItem);
          
            this.pipelineService.Add(this.savedItem).subscribe(
              response => {
                console.log('add the pipeline done');
                //window.location.reload();
                //this.getOpportunityPipeline(this.selectedCategory.id);
                this.getCalendar();
                this.closeOpportunity();
              },
              error => {
                console.error('Error:', error);  // Handle the error here
              }
            );
            
    }

    closeOpportunity(){
        this.newPipeline = false;
        this.editPipeline = false;
        this.openPipeline = false;
    }

    editDetailPipeline(){
        console.log(this.appointment);
        this.savedItem.idCategory = this.selectedCategoryPop.id;
          this.savedItem.nameCategory = this.selectedCategoryPop.name;
          this.savedItem.idPipeline = this.selectedPipelinePop.id;
          console.log(this.savedItem);
        
          this.pipelineService.UpdateOpportunity(this.savedItem).subscribe(
            response => {
              console.log('update the pipeline done');
              //window.location.reload();
              this.getCalendar();
              this.closeOpportunity();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
          
    }

    uploadFile(){
        const formData = new FormData();
        formData.append('file', this.uploadFileData);
        formData.append('idOpportunity', this.idOpportunity.toString());
        this.pipelineService.UploadFile(formData).subscribe(
          response => {
            console.log('uploaded file');
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }

      onFileSelect(event:any){
        //console.log(event.files[0]);
        this.uploadFileData = event.files[0];
      }

      onUpload(event:any){
        console.log('test');
        //this.selectedFile = event.files;
        //console.log(this.editItem.id);
  
        //const formData = new FormData();
        //formData.append('file', event.files[0]);
        //formData.append('idOpportunity', this.idOpportunity.toString());
        //console.log(formData);
      }

      downloadFile(fileData:OpportunityFileDTO){
            const src = `data:data:${fileData.contentType};base64,${fileData.fileDataString}`;
            const link = document.createElement("a")
            link.href = src
            link.download = fileData.fileName;
            link.click()
            
            link.remove()
          }

          getTabs(selectTab:boolean){
            console.log(this.selectedCategoryPop.id);
            this.pipelineService.GetPipelineByCategory(this.selectedCategoryPop.id).subscribe(
              response => {
                this.pipelinePop = response;
                if(selectTab){
                  this.selectTab();
                }
              },
              error => {
                console.error('Error:', error);  // Handle the error here
              }
            );
          }

    constructor(private service: MessageService, private pipelineService: PipelineService, private cookieService: CookieService,) {
      this.cookie = cookieService;
    }

    
}