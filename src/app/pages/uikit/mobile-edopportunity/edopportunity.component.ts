import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { NotesDTO } from '../../../dto/notesdto';
import { FileTypeDTO } from '../../../dto/filetypedto';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PipelineDTO } from '../../../dto/pipelinedto';
import { FileUpload } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-mobile-edopportunity',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule, BadgeModule, ProgressBarModule
    ],
    templateUrl: './edopportunity.component.html',
    styleUrl: './edopportunity.component.css',
    providers: [MessageService]
})
export class EdOpportunityComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    cookie: CookieService;
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    notes:NotesDTO[] = [];
    fileTypes:FileTypeDTO[] = [];
    viewNotesFlag:boolean = false;
    viewFilesFlag:boolean = false;
    addNotesFlag:boolean = false;
    addFilesFlag:boolean = false;
    viewTakePictureFlag:boolean = false;
    viewUploadDocumentsFlag:boolean = false;
    previewImage: SafeResourceUrl | null = null;
    openPreviewImage:boolean = false;
    step:number = -1;
    user:string = '';
    statuses:any;
    selectedCategory:any;
    pipelineDictionary:PipelineDTO[] = [];
    selectedPipelinePop:any;
    pipelineDictionaryFilter:PipelineDTO[] = [];
    note:NotesDTO = new NotesDTO(0,0,'',new Date());
    @ViewChild('video') videoElement!: ElementRef;
    @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
    capturedImage: string = '';
    fileTypeForSave:FileTypeDTO = new FileTypeDTO(0,'',[],[]);
    index:string = "0";
    totalSize:number = 0;
    totalSizePercent:number = 0;
    warnFileType:boolean = false;
    uploadedFiles:any;
    @ViewChild('fileUpload') fileUpload!: FileUpload;
    selectedFile: File | null = null;
    generalWarnMessage:boolean = false;
    generalMessage:string = '';

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.user = this.cookie.get('email');

      if(this.id != null)
        this.idOpportunity = Number(this.id);

      this.getCategory();
      this.getNotes();
      this.getFileNamesS3();
    }

    openSelectFileType(){
      this.generalMessage='Please select the file type for picture or upload';
      this.generalWarnMessage = true;
    }

    uploadFiles(fileItem:any){
      const formData = new FormData();
      formData.append('file', fileItem);
      formData.append('idOpportunity', this.idOpportunity.toString());
      formData.append('fileTypeId', this.fileTypeForSave.id.toString());
      formData.append('idLegacy', '0');
      this.pipelineService.UploadFile(formData).subscribe(
        response => {
          console.log('uploaded file');
          this.getFileNamesS3();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    onTemplatedUpload(event?: any){
      if (event?.files) {
        this.uploadedFiles = event.files; // Captures the uploaded files
        console.log('Uploaded files:', this.uploadedFiles);
        for(var i = 0;i < this.uploadedFiles.length;i++){
          this.uploadFiles(this.uploadedFiles[i]);
        }
        
        // Send to your backend
        //this.sendFilesToBackend(this.uploadedFiles);
      }

      this.totalSize = 0;
      this.totalSizePercent = 0;
      // Clear the file list
      this.fileUpload.clear();
    }

    onSelectedFiles(event:any){
      const files: File[] = event.files;
      for (let file of files) {
        this.totalSize += file.size;
      }
      this.updateTotalSizePercent();
    }

    choose(event:any, chooseCallback:any){
      event.preventDefault();
      chooseCallback(); // This opens the native file picker dialog
    }

    uploadEvent(uploadCallback:any){
      if(this.fileTypeForSave.id == 0){
        this.warnFileType = true;
        return;
      }

      uploadCallback(); // this triggers the actual upload
    }

    updateTotalSizePercent(): void {
      // Assuming max total size is 1MB (1,000,000 bytes) as per your maxFileSize
      this.totalSizePercent = (this.totalSize / 1000000) * 100;
    }

    onRemoveTemplatingFile(event:any, file:any, removeFileCallback:any, index:any){
      this.totalSize -= file.size;
      removeFileCallback(index); // removes from pending file list
      this.updateTotalSizePercent();
    }

    formatSize(size:any){
      if (size === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    stopClick(event: any) {
      event.stopPropagation();
    }

    addNote(){
      this.note.idOpportunity = this.opportunity.id;

      this.pipelineService.AddNote(this.note).subscribe(
            response => {
              this.getNotes();
              this.addNotesFlag = false;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    refreshTabs(){
      this.pipelineDictionaryFilter = this.pipelineDictionary.filter(pipeline => pipeline.idCategory == this.selectedCategory.id);
    }

    getPipeline(){
      this.pipelineService.GetPipelines().subscribe(
        response => {
          this.pipelineDictionary = response;
          this.refreshTabs();
          this.getOpportunity();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getCategory(){
      this.pipelineService.GetCategory(this.user).subscribe(
        response => {
          this.statuses = response;
          this.selectedCategory = this.statuses[0];
          this.getPipeline();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    updateTab(){
          this.opportunity.idCategory = this.selectedCategory.id;
          this.opportunity.idPipeline = this.selectedPipelinePop.id;

          this.pipelineService.Update(this.opportunity).subscribe(
            response => {
              this.resetStep();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateAppointment(){
          this.pipelineService.UpdateAppointment(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateDetails(){
          this.pipelineService.UpdateDetails(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateSetters(){
          this.pipelineService.UpdateSetters(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateEmail(){
          this.pipelineService.UpdateEmail(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateNameCustomer(){
          this.pipelineService.UpdateNameCustomer(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updatePhone(){
          this.pipelineService.UpdatePhone(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateAddress(){
          this.pipelineService.UpdateAddress(this.opportunity).subscribe(
            response => {
              this.next();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    resetStep(){
      this.step=-1;
    }

    startEdit(){
      this.step+=1;
    }

    next(){
      this.step+=1;
    }

    goHome(){
      window.location.href='/uikit/mobilehome';
    }

    previewFileS3(fileId:number){
    
          this.pipelineService.GetFileS3ByName(fileId).subscribe(
            response => {
    
              if(response.url != ''){
                console.log(response.url);
                this.previewImage = this.sanitizer.bypassSecurityTrustResourceUrl(response.url);
                this.openPreviewImage = true;
              }else{
                console.error('Error Backend:', response.error);  // Handle the error here
              }
              
    
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
       
    }

    enableSession(currentSession:string){

        if(currentSession=='main'){
            return !this.viewNotesFlag && !this.viewFilesFlag && !this.addNotesFlag && !this.addFilesFlag && this.step == -1;
        }

        if(currentSession=='addnotes'){
            return !this.viewNotesFlag && !this.viewFilesFlag && !this.addFilesFlag;
        }

        if(currentSession=='addfiles'){
            return !this.viewNotesFlag && !this.viewFilesFlag && !this.addNotesFlag;
        }

        if(currentSession=='viewfiles'){
            return !this.viewNotesFlag && !this.addNotesFlag && !this.addFilesFlag;
        }

        if(currentSession=='viewnotes'){
            return !this.viewFilesFlag && !this.addNotesFlag && !this.addFilesFlag;
        }

        return true;
    }

    descNotes(){
        return this.viewNotesFlag ? 'Hide Notes' : 'View Notes';
    }

    descFiles(){
        return this.viewFilesFlag ? 'Hide Files/Pictures' : 'View Files/Pictures';
    }

    onFileSelected(event: Event) {
      event.stopImmediatePropagation();

      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }

    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video: HTMLVideoElement = this.videoElement.nativeElement;
          video.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
        });
    }

    capturePhoto() {

        console.log(this.videoElement);
        console.log(this.canvasElement);
        
        const video = this.videoElement.nativeElement;
        const canvas = this.canvasElement.nativeElement;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          this.capturedImage = canvas.toDataURL('image/png');
        }

        return this.capturedImage;
    }

    dataURLtoBlob(dataURL: string): Blob {
      const parts = dataURL.split(',');
      const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
      const binary = atob(parts[1]);
      const array = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      return new Blob([array], { type: mime });
    }

    uploadPhoto(event:any){
      event.stopPropagation();

      var video = this.capturePhoto();
      const blob = this.dataURLtoBlob(video);

      if(this.fileTypeForSave.id == 0){
        this.openSelectFileType();
        return;
      }

      const formData = new FormData();
      formData.append('file', blob, 'photo.png');
      formData.append('idOpportunity', this.idOpportunity.toString());
      formData.append('fileTypeId', this.fileTypeForSave.id.toString());
      formData.append('idLegacy', '0');
      this.pipelineService.UploadFile(formData).subscribe(
        response => {
          console.log('uploaded file');
          this.getFileNamesS3();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

    }

    uploadFile(event:any){
      event.stopPropagation();

      if(this.fileTypeForSave.id == 0){
        this.openSelectFileType();
        return;
      }

      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('idOpportunity', this.idOpportunity.toString());
      formData.append('fileTypeId', this.fileTypeForSave.id.toString());
      formData.append('idLegacy', '0');
      this.pipelineService.UploadFile(formData).subscribe(
        response => {
          console.log('uploaded file');
          this.viewUploadDocumentsFlag=false;
          this.addFilesFlag=false;
          this.getFileNamesS3();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

    }

    viewUploadDocuments(){
      this.viewUploadDocumentsFlag = true;
    }

    viewTakePicture(){
        this.startCamera();
        this.viewTakePictureFlag = !this.viewTakePictureFlag;
    }

    viewAddFiles(){
        this.addFilesFlag = !this.addFilesFlag;
    }

    viewNotes(){
        this.viewNotesFlag = !this.viewNotesFlag;
    }

    viewAddNotes(){
      this.addNotesFlag = !this.addNotesFlag;
    }

    viewFiles(){
        this.viewFilesFlag = !this.viewFilesFlag;
    }

    editOpportunity(){

    }

    emptyOpportunity(){
          return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
                ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }

    getOpportunity(){
      this.pipelineService.GetSingleOpportunity(this.idOpportunity).subscribe(
        response => {
          this.opportunity = response;
          this.opportunity.emailUser = this.user;
          this.setCategory();
          this.setPipeline();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    setCategory(){
      for(var i = 0;i < this.statuses.length;i++){
        if(this.statuses[i].id == this.opportunity.idCategory){
          this.selectedCategory = this.statuses[i];
          i = this.statuses.length;
        }
      }
    }

    setPipeline(){
      for(var i = 0;i < this.pipelineDictionary.length;i++){
        if(this.pipelineDictionary[i].id == this.opportunity.idPipeline){
          this.selectedPipelinePop = this.pipelineDictionary[i];
          i = this.pipelineDictionary.length;
        }
      }
    }

    getNotes(){
      this.pipelineService.GetNotes(this.idOpportunity).subscribe(
        response => {
          this.notes = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getFileNamesS3(){
      this.pipelineService.GetOpportunityFiles(this.idOpportunity).subscribe(
        response => {
          this.fileTypes = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    newOpportunity(){
      window.location.href='/uikit/newopmobile';
    }

    searchOpportunity(){
      window.location.href='/uikit/searchmobile';
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute
      ,private paymentService: PaymentService,private cookieService: CookieService, private pipelineService: PipelineService
      ,private sanitizer: DomSanitizer
    ) {
      this.cookie = cookieService;
    }

    
}
