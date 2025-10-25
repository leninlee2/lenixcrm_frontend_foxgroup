import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, AfterViewInit , ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityDTO } from '../../../dto/opportunitydto';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { OpportunityFileDTO } from '../../../dto/opportunityfiledto';
import { NotesDTO } from '../../../dto/notesdto';
import { DatePickerModule } from 'primeng/datepicker';
import { PipelineDTO } from '../../../dto/pipelinedto';
import { CategoryDTO } from '../../../dto/categorydto';
import { ApiUrl } from '../../service/constants';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProductServiceDTO } from '../../../dto/productservicedto';
import { ProductService } from '../../service/product.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { SalesService } from '../../service/sales.service';
import { FileTypeDTO } from '../../../dto/filetypedto';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUpload } from 'primeng/fileupload';
import { AuthenticationService } from '../../service/authentication.service';
import { TooltipModule } from 'primeng/tooltip';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DividerModule } from 'primeng/divider';
import { AutomationService } from '../../service/automation.service';
import { CriticityDTO } from '../../../dto/criticitydto';
import { CookieService } from 'ngx-cookie-service';
import { UserGroupService } from '../../service/usergroup.service';
import { UserGroupDTO } from '../../../dto/usergroupdto';
import { OpportunityFileS3DTO } from '../../../dto/opportunityfiles3dto';
import { CustomRolesDTO } from '../../../dto/customrolesdto';
import { CustomFormDTO } from '../../../dto/customformdto';
import { ReviewFormDTO } from '../../../dto/reviewformdto';
import { GaveUpFormDTO } from '../../../dto/gaveupformdto';
import { DashboardQtde } from '../../../dto/dashboardqtde';
import { LogChangeTabDTO } from '../../../dto/logchangetabdto';

@Component({
    selector: 'app-pipelines',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,
      DragDropModule,CardModule,TabsModule,SelectModule,TableModule
      ,DialogModule,AvatarModule,FileUploadModule,DatePickerModule,ToggleSwitchModule
      ,AutoCompleteModule,BadgeModule,ProgressBarModule,TooltipModule,ColorPickerModule
      ,DividerModule],
    templateUrl: './pipeline.component.html',
    styleUrl: './pipeline.component.css',
    providers: [MessageService]
})
export class PipelineComponent  implements OnInit, AfterViewInit {
    
    selectedPipeline:OpportunityPipelineDTO = this.emptyOpportunity();
    statuses:any;
    categories:any;
    availablePipelines:OpportunityDTO[] = [];
    updatedPipeline: any;
    opportunityCount:number = 0;
    oportunitiestable:any = [];
    selectedCategory:any;
    selectedCategoryPop:any;
    editPipeline:boolean = false;
    newPipeline:boolean = false;
    openPipeline:boolean = false;
    selectedPipelinePop:any;
    customerName:string = '';
    dateFake:Date = new Date();
    savedItem:OpportunityPipelineDTO = this.emptyOpportunity();
    pipelineList:any = [];
    phone:string = '';
    address:string = '';
    email:string = '';
    details:string = '';
    editItem:OpportunityPipelineDTO = this.emptyOpportunity();
    value:number = 0;
    idOpportunity:number = 0;
    idCustomer:number = 0;
    owner:string = '';
    selectedFile:any;
    uploadFileData:any;
    note:string = '';
    quill: any;
    notes: NotesDTO[] = [];
    index:string = "0";
    @ViewChild('tabop') tabop!: ElementRef;
    appointment:string | null = null;
    appointmentLabel!:string;
    pipelineDictionary:PipelineDTO[] = [];
    pipelineName:string = '';
    openPipelineDic:boolean = false;
    pipelineEdit:PipelineDTO = new PipelineDTO(0,'',0,false,0,0);
    warnDeletePipeline:boolean = false;
    openCategoryDic:boolean = false;
    categoryEdit:CategoryDTO = new CategoryDTO(0,'');
    warnDeleteCategory:boolean = false;
    warnDeleteOpportunity:boolean = false;
    tabName:string = '';
    conversion:boolean = false;
    pipelinePop:PipelineDTO[] = [];
    editNoteItem: NotesDTO = new NotesDTO(0,0,'',new Date());
    fileUrl:string = ApiUrl + '/opportunitypipeline/uploadfile';
    editedTab:PipelineDTO = new PipelineDTO(0,'',0,false,0,0);
    productItem: ProductServiceDTO = new ProductServiceDTO(0,'',0,new Date(),true,0);
    productServices:ProductServiceDTO[] = [];
    filteredProductServices:ProductServiceDTO[] = [];
    filteredSalesman:SalesmanDTO[] = [];
    filteredSalesCustomerFilter:SalesmanDTO[] = [];
    salesmans:SalesmanDTO[] = [];
    salesCustomerFilter:SalesmanDTO[] = [];
    salesman:SalesmanDTO = new SalesmanDTO(0,'',1);
    salesCustomFilter:SalesmanDTO = new SalesmanDTO(0,'',0);
    pAppointment:Date | null = null;
    fileTypes:FileTypeDTO[] = [];
    fileType:FileTypeDTO = new FileTypeDTO(0,'',[],[]);
    openFileTypePop:boolean = false;
    totalSize:number = 0;
    totalSizePercent:number = 0;
    fileTypeForSave:FileTypeDTO = new FileTypeDTO(0,'',[],[]);
    uploadedFiles:any;
    warnFileType:boolean = false;
    fileColumns = [1, 2, 3, 4, 5];
    @ViewChild('fileUpload') fileUpload!: FileUpload;
    saleCustomname:string = '';
    allProfilePics:OpportunityFileDTO[] = [];
    openPreviewImage:boolean = false;
    previewImage: SafeResourceUrl | null = null;
    colorCriticity:string = 'red';
    criticities:CriticityDTO[] = [];
    criticityPop:CriticityDTO = new CriticityDTO(0,'','',true);
    generalWarnMessage:boolean = false;
    generalMessage:string = '';
    user:string = '';
    cookies:CookieService;
    userGroups:UserGroupDTO[] = [];
    isOwner:boolean = false;
    customRoles:CustomRolesDTO[] = [];
    customRole:CustomRolesDTO = new CustomRolesDTO(0,'');
    customForms:CustomFormDTO[] = [];
    customForm: CustomFormDTO = new CustomFormDTO(0,'');
    openFormReview:boolean = false;
    reviewForm:ReviewFormDTO = new ReviewFormDTO(0,0,'','',false,false,0,'',new Date(),'', new Date(),false,false );
    opportunityAfterReview:OpportunityDTO = new OpportunityDTO(0,'',[]);
    deadlineStand:Date | null = null;
    defaultDate:Date = new Date();
    openGaveUpForm:boolean = false;
    gaveUpForm:GaveUpFormDTO = new GaveUpFormDTO(0,0,'',0,'','',false,false,false,'');
    dashboardQtdes:DashboardQtde[] = [];
    logChangeTabs:LogChangeTabDTO[] = [];
    setters:string = '';
    
    ngOnInit(): void {
      this.user = this.cookies.get('email');
      this.getUserGroups();
      this.getCategory();
      this.getAllCategories();
      this.getAllCriticities();
      this.getAllProfilePics();
      this.getAllSalesman();
      this.getAllProducts();
      this.getPipeline();
      this.getFileTypes();
      this.getCustomRoles();
      this.getCustomForms();
      this.getDashboardQtde();
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'', '' );
    }

    getQtdeByPipeline(idPipeline:number){
      var qtde = 0;

      for(var i = 0;i < this.dashboardQtdes.length;i++){
        if(this.dashboardQtdes[i].idPipeline == idPipeline){
          qtde = this.dashboardQtdes[i].qtde;
          i = this.dashboardQtdes.length;
        }
      }

      return qtde;
    }

    getDashboardQtde(){
      this.pipelineService.GetDashboardQtde().subscribe(
        response => {
          this.dashboardQtdes = response;
          console.log(this.dashboardQtdes);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getUserGroups(){
      this.userGroupService.GetByUserName(this.user).subscribe(
        response => {
          this.userGroups = response;
          this.isOwner = this.userGroups.filter(group => group.groupName == 'Owner').length > 0;
          console.log('has owner group:' + this.isOwner);
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
          console.log(this.statuses);
          this.selectedCategory = this.statuses[0];
          this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllCategories(){
      this.pipelineService.GetCategory('').subscribe(
        response => {
          this.categories = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllCriticities(){
      this.automationService.GetCriticity().subscribe(
        response => {
          this.criticities = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getDefaultColor(color:string){
      if(color != '#FFFFFF' && color != 'white'){
        return color;
      }
      return 'gray';
    }

    hasProfileImage(opportunity:OpportunityPipelineDTO){
      if(opportunity.idUser > 0)
        return this.checkImagePic(opportunity.idUser);
      else
        return false;
    }

    checkImagePic(idUser:number){
      if(this.allProfilePics == null || this.allProfilePics.length == 0)
        return false;
      else{
        return this.allProfilePics.filter(item =>
          item.idUser == idUser
        ).length > 0;
      }
    }

    getImageProfile(opportunity:OpportunityPipelineDTO){
      let userFile = this.allProfilePics.filter(item =>
          item.idUser == opportunity.idUser
        )[0]

      return `data:${userFile.contentType};base64,${userFile.fileDataString}`;
    }

    getAllProfilePics(){
      this.userService.GetAllFiles().subscribe(
        response => {
          this.allProfilePics = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getRemainingColumns(items:OpportunityFileDTO[]): number[] {
      let diff = 5;

      if(items != null){
        diff = this.getFileColumnCount().length - items.length;
        if(diff < 0)
          diff = 0;
      }
     
      return Array(diff).fill(0); // e.g., [0, 0] for two extra columns
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

    updateTotalSizePercent(): void {
      // Assuming max total size is 1MB (1,000,000 bytes) as per your maxFileSize
      this.totalSizePercent = (this.totalSize / 1000000) * 100;
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

    formatSize(size:any){
      if (size === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    onRemoveTemplatingFile(event:any, file:any, removeFileCallback:any, index:any){
      this.totalSize -= file.size;
      removeFileCallback(index); // removes from pending file list
      this.updateTotalSizePercent();
    }

    inactiveFileType(fileTypeDTO: FileTypeDTO, event:any){
      event.stopImmediatePropagation();
      this.fileType = fileTypeDTO;
      this.pipelineService.InativeFileType(this.fileType).subscribe(
          response => {
            this.getFileTypes();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    addFileTypePop(){
      this.fileType = new FileTypeDTO(0,'',[],[]);
      this.openFileTypePop = true;
    }

    addFileType(){
      if(this.fileType.id == 0){
        this.pipelineService.AddFileType(this.fileType).subscribe(
          response => {
            this.openFileTypePop = false;
            this.getFileTypes();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.pipelineService.UpdateFileType(this.fileType).subscribe(
          response => {
            this.openFileTypePop = false;
            this.getFileTypes();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    editFileTypePop(fileTypeDTO:FileTypeDTO){
      this.fileType = fileTypeDTO;
      this.openFileTypePop = true;
    }

    getFileTypes(){
      this.pipelineService.GetFileTypes().subscribe(
        response => {
          this.fileTypes = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllSalesman(){
      this.salesService.GetSalesman().subscribe(
        response => {
          this.salesmans = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

      //just for filter
      this.getAllSalesmanOrCustomer();
    }

    getAllSalesmanOrCustomer(){
      this.salesService.GetSalesmanOrCustomer(this.user).subscribe(
        response => {
          this.salesCustomerFilter = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    filterSalesman(event: any) {
      const query = event.query.toLowerCase();
      this.filteredSalesman = this.salesmans.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    filterSalesmanOrCustomer(event: any) {
      const query = event.query.toLowerCase();
      this.filteredSalesCustomerFilter = this.salesCustomerFilter.filter(item =>
        item.name.toLowerCase().includes(query)
      );

      this.saleCustomname = query;
    }

    getAllProducts(){
      this.productService.GetProductServices().subscribe(
        response => {
          this.productServices = response;
          console.log(this.productServices);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    filterProduct(event: any) {
      const query = event.query.toLowerCase();
      this.filteredProductServices = this.productServices.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    fillTab(editedTab:PipelineDTO){
      this.editedTab = editedTab;
      this.getRole(this.editedTab.idRole);
      this.getForm(this.editedTab.idForm);
    }

    getForm(id:number){
      this.customForm = new CustomFormDTO(0,'');
      for(var i = 0;i < this.customForms.length;i++){
        if(this.customForms[i].id == id){
          this.customForm = this.customForms[i];
        }
      }
    }

    getRole(id:number){
      this.customRole = new CustomRolesDTO(0,'');
      for(var i = 0;i < this.customRoles.length;i++){
        if(this.customRoles[i].id == id){
          this.customRole = this.customRoles[i];
        }
      }
    }

    getToggleTab(pipeline: PipelineDTO):boolean{
      return pipeline.conversion ?? false; // null -> false
    }

    redirectShedule(){
      window.location.href='/uikit/schedule';
    }

    limitAddress(address:string){
      return address == null?'':(address.length > 40?address.substring(0,40):address);
    }

    ngAfterViewInit() {
      // Optionally, set the tab after view initialization to ensure it works
      setTimeout(() => {
        this.index = "0";  // Select Tab 2
      }, 0);
    }

    newOpportunity(){
      this.cleanForm();
      this.index = "0";
      this.newPipeline = true;
      this.editPipeline = false;
      this.openPipeline = true;

      if(this.editItem != null && this.editItem.fileTypesByOpportunity != null)
        this.editItem.fileTypesByOpportunity = [];
    }

    editOpportunity(pipelineItem: OpportunityPipelineDTO, pipeline: OpportunityDTO, index:string){
      this.index=index;
      this.cleanForm();
      this.editItem = pipelineItem;

      this.pipelineService.GetPipelineByCategory(pipelineItem.idCategory).subscribe(
        response => {
          this.pipelinePop = response;
          this.selectedPipelinePop = new PipelineDTO(pipeline.idPipeline
            ,pipeline.namePipeline,pipelineItem.idCategory,false,0,0);
          console.log(this.selectedPipelinePop);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

      this.pipelineService.GetOpportunityFiles(this.editItem.id).subscribe(
        response => {
          this.editItem.fileTypesByOpportunity = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
      
      this.pipelineService.GetReviewForm(this.editItem.id).subscribe(
        response => {
          console.log('get review forms');
          this.reviewForm = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

      this.pipelineService.GetGaveUpForm(this.editItem.id).subscribe(
        response => {
          console.log('get gave up forms');
          this.gaveUpForm = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

      this.pipelineService.GetLogChangeTab(this.editItem.id).subscribe(
        response => {
          this.logChangeTabs = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
      
      this.fillForm();
      this.newPipeline = false;
      this.editPipeline = true;
      this.openPipeline = true;
    }

    getFileColumnCount(){
      let columnNumber = this.fileColumns.length;

      if(this.editItem != null && this.editItem.fileTypesByOpportunity!= null){
        for(var i = 0;i < this.editItem.fileTypesByOpportunity.length;i++){
          let item = this.editItem.fileTypesByOpportunity[i];
          if(columnNumber < item.opportunityFilesS3.length)
            columnNumber = item.opportunityFilesS3.length;
        }
      }

      const sequence = Array.from({ length: columnNumber }, (_, i) => i);

      return sequence;
    }

    fillForm(){
      this.pAppointment = null;

      this.customerName = this.editItem.nameCustomer;
      this.phone = this.editItem.phone;
      this.address = this.editItem.address;
      this.email = this.editItem.email;
      this.details = this.editItem.details;
      this.value = this.editItem.value;
      this.idOpportunity = this.editItem.id;
      this.idCustomer = this.editItem.idCustomer;
      this.owner = this.editItem.owner;
      this.appointment = this.editItem.appointment;
      this.setters = this.editItem.setters;

      if(this.editItem.deadlineStand != null){
        console.log(this.editItem.deadlineStand);
        if(new Date(this.editItem.deadlineStand).getFullYear() > 1900){
          this.deadlineStand = new Date(this.editItem.deadlineStand);
        }else 
          this.deadlineStand = null;
        

      }

      if(this.appointment != null && this.appointment != '')
        this.pAppointment = new Date(this.appointment);

      this.selectedCategoryPop = {id:this.editItem.idCategory,name:this.editItem.nameCategory};
      this.getCriticity(this.editItem.idCriticity);
      this.getSalesman(this.editItem.idUser);
      this.getProduct(this.editItem.idProduct);
      this.getTabs(true);
      console.log(this.editItem);
      this.getNotes(this.editItem.id);
    }

    getCriticity(id:number){
      for(var i = 0;i < this.criticities.length;i++){
        if(this.criticities[i].id == id){
          this.criticityPop = this.criticities[i];
          return;
        }
      }
    }

    getProduct(id:number){
      for(var i = 0;i < this.productServices.length;i++){
        if(this.productServices[i].id == id){
          this.productItem = this.productServices[i];
          return;
        }
      }
    }

    getSalesman(id:number){
      console.log('got salesman' + id);
      for(var i = 0;i < this.salesmans.length;i++){
        if(this.salesmans[i].id == id){
          this.salesman = this.salesmans[i];
          return;
        }
      }
    }

    cleanForm(){
      this.pAppointment = null;
      this.idOpportunity = 0;
      this.customerName = '';
      this.phone = '';
      this.address = '';
      this.email = '';
      this.details = '';
      this.value = 0;
      this.owner = '';
      this.note = '';
      this.productItem = new ProductServiceDTO(0,'',0,new Date(),true,0);
      this.salesman = new SalesmanDTO(0,'',1);
      this.criticityPop = new CriticityDTO(0,'','',true);
      this.reviewForm = new ReviewFormDTO(0,0,'','',false,false,0,'',new Date,'',new Date(),false,false);
      this.gaveUpForm = new GaveUpFormDTO(0,0,'',0,'','',false,false,false,'');
    }

    closeOpportunity(){
      this.newPipeline = false;
      this.editPipeline = false;
      this.openPipeline = false;
    }

    isVisiblePipeline(){
      return this.editPipeline || this.newPipeline;
    }

    refreshCategory(){
      console.log(this.selectedCategory);
      this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
    }

    getOpportunityPipeline(idCategory:number,salesCustomFilter:SalesmanDTO){
      this.pipelineService.GetOpportunityPipelinesAllFilter(idCategory,salesCustomFilter,this.user).subscribe(
        response => {
          this.availablePipelines = response;
          this.countPipelines();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    searchBySalesCustom(event:any){
      this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
    }

    onInput(event: any) {
      const value = event.target.value?.trim();
      if (!value) {
        console.log('Input cleared by user');
        this.salesCustomFilter = new SalesmanDTO(0,'',0);
        this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
      }
    }

    onKeyDownSearch(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        console.log('onKeyDownSearch');
        this.salesCustomFilter = new SalesmanDTO(0,this.saleCustomname,0);
        this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
    
        // Optional: prevent default behavior
        event.preventDefault();
      }
    }

    countPipelines(){
      this.opportunityCount = 0;
      this.oportunitiestable = [];
      for(var i = 0;i < this.availablePipelines.length;i++){
        this.opportunityCount+= this.availablePipelines[i].opportunityPipeline.length;
        this.fillOpportunityRow(this.availablePipelines[i].opportunityPipeline);
      }
    }

    fillOpportunityRow(opportunityPipelines: OpportunityPipelineDTO[]){
      for(var i = 0;i < opportunityPipelines.length;i++){
        var item = {name:opportunityPipelines[i].nameCustomer, 
          phone:opportunityPipelines[i].phone, 
          status:opportunityPipelines[i].namePipeline, 
          value:opportunityPipelines[i].value, 
          owner: opportunityPipelines[i].owner, 
          created:opportunityPipelines[i].createTime, 
          updated:opportunityPipelines[i].updateTime, 
          stage:opportunityPipelines[i].nameCategory };

          this.oportunitiestable.push(item);
      }
      
    }

      selectedCity: any = 'AC';
    
      selectedPipelines: any[] = [];
    
      // Triggered when drag starts
      dragStart(item: OpportunityPipelineDTO) {
        console.log('Drag started:', item);
        this.selectedPipeline = item;
      }
    
      // Triggered when drag ends
      dragEnd(pipeline: OpportunityDTO, event: Event) {

        const parentDiv = (event.target as HTMLElement).parentElement;
        if (parentDiv) {
          // Do something with the parent div
          var pipeId = parentDiv.getAttribute('data-pipeline');
          console.log(pipeId);
        }
      }
    
      // Triggered when a product is dropped into the drop zone
      drop() {
        console.log('Product dropped');
      }
    
      // Function to handle drop logic
      handleDrop(event: any, opportunity: OpportunityDTO, bypassform:boolean) {

        this.customValidations(opportunity,bypassform);
        
     }



    getTabDetail(opportunity: OpportunityDTO){
      var pipeDetail = new PipelineDTO(0,'',0,false,0,0);

      for(var i = 0;i < this.pipelineDictionary.length;i++){
        if(this.pipelineDictionary[i].id == opportunity.idPipeline){
          pipeDetail = this.pipelineDictionary[i];
        }
      }

      return pipeDetail;
    }

    addNextQueue(idPipeline: number){
      for(var i = 0;i < this.availablePipelines.length;i++){
        if(this.availablePipelines[i].idPipeline == idPipeline){
          this.availablePipelines[i].opportunityPipeline.push(this.selectedPipeline);
        }
      }

      //remove from  previous queue:
      for(var i = 0;i < this.availablePipelines.length;i++){
        if(this.availablePipelines[i].idPipeline == this.selectedPipeline.idPipeline){
          const index: number = this.availablePipelines[i].opportunityPipeline.indexOf(this.selectedPipeline);
          if (index !== -1) {
            this.availablePipelines[i].opportunityPipeline.splice(index, 1);
          }
        }
      }

      this.updatedPipeline = new OpportunityPipelineDTO(this.selectedPipeline.id,0,idPipeline,0,'','','','','','','',0
        , '',this.dateFake,this.dateFake, '',0,0,0,'', new Date(), this.user, '' );

      this.pipelineService.Update(this.updatedPipeline).subscribe(
        response => {
          console.log('update the pipeline done');
          this.selectedPipeline.idPipeline = idPipeline;
          this.selectedPipeline.color = '#FFFFFF';
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

    }

    saveNewPipeline(){
      //let appointment = (this.appointment != null 
      //  && this.appointment!= undefined?this.appointment.toLocaleString():'');
      this.appointment = (this.pAppointment != null?this.pAppointment.toLocaleString('en-US'
        , {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit', 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' }):'');

      this.savedItem = new OpportunityPipelineDTO(0,this.selectedCategoryPop.id,
        this.selectedPipelinePop.id,0,this.selectedCategoryPop.name,'', this.customerName
        , this.phone, this.address, this.email,this.details, this.value, this.salesman.name,this.dateFake,this.dateFake
        , this.appointment,this.productItem.id,this.salesman.id,this.criticityPop.id
        ,this.criticityPop.color, this.deadlineStand, this.user , this.setters );
      
        this.pipelineService.Add(this.savedItem).subscribe(
          response => {
            console.log('add the pipeline done');
            //window.location.reload();
            this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
            this.closeOpportunity();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
        
    }

    customValidations(opportunity:OpportunityDTO, bypassform:boolean){
       var futureTab = this.getTabDetail(opportunity);
       //console.log('customValidations');
       //console.log(futureTab);
       //console.log(futureTab.name.toLocaleLowerCase().indexOf('stand by'));

       //1 = Check basic customer data:
       if(futureTab.idRole == 1){
          if(this.selectedPipeline.phone == ''
            || this.selectedPipeline.address == ''
            || this.selectedPipeline.nameCustomer == ''
            || this.selectedPipeline.appointment == ''
          ){
            this.generalMessage = 'The name of customer, address, phone and appointment is required to proceed.';
            this.generalWarnMessage = true;
          }else{
            this.addNextQueue(opportunity.idPipeline);
          }
       }
       //7 = Open a Form in General before move it.
       else if(futureTab.idRole == 7){
          //2 = Review Form
          console.log('calling idRole=7');
          //if(futureTab.idForm == 1){
          //  this.hasGaveUpForm(opportunity,bypassform);

          if(futureTab.idForm == 2){
            this.hasFilesForEstimate(opportunity,bypassform);
          }else{
            this.addNextQueue(opportunity.idPipeline);
          }
       }else if(futureTab.name.toLocaleLowerCase().indexOf('closing') >= 0 ){
          //2 = Review Form
          console.log('calling for closing');
          this.hasFilesForClosing(opportunity);
       }else if(futureTab.name.toLocaleLowerCase().indexOf('closed') >= 0 ){
          //2 = Review Form
          console.log('calling for closed');
          this.hasFilesForClosed(opportunity);
       }else if(futureTab.name.toLocaleLowerCase().indexOf('stand by') >= 0 ){
          //2 = Review Form
          console.log('calling for stand by');
          console.log(this.selectedPipeline.deadlineStand);
          if(this.selectedPipeline.deadlineStand == null || new Date(this.selectedPipeline.deadlineStand).getFullYear() <= 1900 ){
            this.generalMessage = 'A Deadline of Stand By is required to proceed.';
            this.generalWarnMessage = true;
          }else{
            this.addNextQueue(opportunity.idPipeline);
          }
       }else{
          this.addNextQueue(opportunity.idPipeline);
       }   
    }

    hasFilesForClosed(opportunity:OpportunityDTO){
      this.pipelineService.HasFilesClosed(this.selectedPipeline.id).subscribe(
                response => {
                  console.log('using hasFilesForClosed:' + response);
                  if(response == false){
                    this.generalMessage = 'Please upload all needed files for closed (Contract).';
                    this.generalWarnMessage = true;
                  }else{
                    this.addNextQueue(opportunity.idPipeline);
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    hasFilesForClosing(opportunity:OpportunityDTO){
      this.pipelineService.HasFilesClosing(this.selectedPipeline.id).subscribe(
                response => {
                  console.log('using HasFilesClosing:' + response);
                  if(response == false){
                    this.generalMessage = 'Please upload all needed files for closing (Estimate).';
                    this.generalWarnMessage = true;
                  }else{
                    this.addNextQueue(opportunity.idPipeline);
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    hasFilesForEstimate(opportunity:OpportunityDTO,bypassform:boolean){
      this.pipelineService.HasFilesEstimate(this.idOpportunity).subscribe(
                response => {
                  console.log('using HasFilesEstimate:' + response);
                  if(response == false){
                    this.generalMessage = 'Please upload all needed files for estimate (Access, Eletricity Panel and Layout).';
                    this.generalWarnMessage = true;
                  }else{
                    //this.addNextQueue(opportunity.idPipeline);
                    if(bypassform == false){
                      this.hasForm(opportunity);
                    }else{
                      this.addNextQueue(opportunity.idPipeline);
                    }
                    
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    hasFilesForEstimateOnSave(){
      console.log('hasFilesForEstimateOnSave:' + this.idOpportunity);
      this.pipelineService.HasFilesEstimate(this.idOpportunity).subscribe(
                response => {
                  console.log('using HasFilesEstimate:' + response);
                  if(response == false){
                    this.generalMessage = 'Please upload all needed files for estimate (Access, Eletricity Panel and Layout).';
                    this.generalWarnMessage = true;
                  }else{
                    this.hasFormOnReview();              
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    hasGaveUpForm(){

        console.log('hasGaveUpForm:' + this.idOpportunity);
        this.pipelineService.HasGaveUpForm(this.idOpportunity).subscribe(
                          response => {
                              console.log('using HasForm:' + response);
                              if(response == false){
                                  this.openGaveUpForm = !response;
                              }else{
                                  this.editOrSave();
                              }
                          },
                          error => {
                                      console.error('Error:', error);  // Handle the error here
                          }
        );
          
    }

    hasForm(opportunity:OpportunityDTO){
      this.pipelineService.HasForm(this.idOpportunity).subscribe(
                response => {
                  console.log('using HasForm:' + response);
                  if(response == false){
                    this.opportunityAfterReview = opportunity;
                    this.openFormReview = !response;
                  }else{
                    this.addNextQueue(opportunity.idPipeline);
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    hasFormOnReview(){
      this.pipelineService.HasForm(this.idOpportunity).subscribe(
                response => {
                  console.log('using HasForm:' + response);
                  if(response == false){
                    this.openFormReview = !response;
                  }else{
                    this.editOrSave();
                  }
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
      );
    }

    editOrSaveValidation(){

      console.log('editOrSaveValidation');

      if(!this.validationOpportunity())
        return;

      console.log(this.selectedPipelinePop.name);
      console.log(this.selectedPipelinePop.name.toLowerCase().indexOf('estimate'));

      if(this.selectedPipelinePop.name.toLowerCase().indexOf('estimate') >= 0){
        this.hasFilesForEstimateOnSave()
      }
      else if(this.selectedCategoryPop.name.toLowerCase().indexOf('gave up') >= 0){
        this.hasGaveUpForm()
      }else{

        // save itself
        if(this.newPipeline){
          this.saveNewPipeline();
        }else{
          this.editDetailPipeline();
        }
      }

      
    }

    editOrSave(){

      if(!this.validationOpportunity())
        return;

      // save itself
        if(this.newPipeline){
          this.saveNewPipeline();
        }else{
          this.editDetailPipeline();
        }

      
    }

    validationOpportunity(){

      console.log(this.selectedCategoryPop);

      if(this.phone == ''
          || this.customerName == ''
          || (this.selectedCategoryPop == undefined || this.selectedCategoryPop.id == 0 )
          || (this.selectedPipelinePop == undefined || this.selectedPipelinePop.id == 0 )
        ){

        if(this.customerName == '')
          this.generalMessage = 'The name of customer is required to proceed.';

        else if(this.phone == '')
          this.generalMessage = 'A phone is required to proceed.';

        else if(this.selectedCategoryPop == undefined || this.selectedCategoryPop.id == 0)
          this.generalMessage = 'A Pipeline is required to proceed.';

        else if(this.selectedPipelinePop == undefined || this.selectedPipelinePop.id == 0)
          this.generalMessage = 'A Tab is required to proceed.';

        this.generalWarnMessage=true;
        return false;
      }

      return true;
    }

    editDetailPipeline(){

      console.log('deadlinestand:' + this.deadlineStand);

      this.appointment = (this.pAppointment != null?this.pAppointment.toLocaleString('en-US'
        , {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit', 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' }):'');

      this.savedItem = new OpportunityPipelineDTO(this.idOpportunity,this.selectedCategoryPop.id,
        this.selectedPipelinePop.id, this.idCustomer ,this.selectedCategoryPop.name,'', this.customerName
        , this.phone, this.address, this.email,this.details, this.value, this.salesman.name,this.dateFake
        ,this.dateFake, this.appointment,this.productItem.id,this.salesman.id
        ,this.criticityPop.id,this.criticityPop.color, this.deadlineStand , this.user , this.setters);
      
        this.pipelineService.UpdateOpportunity(this.savedItem).subscribe(
          response => {
            console.log('update the pipeline done');
            //window.location.reload();
            console.log('category:' + this.selectedCategory.id);
            this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter);
            this.closeOpportunity();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
        
    }

    getUserIcon(name:string){
      let myArray: string[] = name.split(" ");
      let iconname = '';
      for(var i = 0;i < myArray.length;i++){
        iconname += myArray[i].charAt(0).toUpperCase();
      }
      return iconname;
    }

    editNote(note:NotesDTO){
      this.note = note.note;
      this.editNoteItem = note;
    }

    openChat(){
      
    }

    onFileSelect(event:any){
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

    getCustomRoles(){
      this.pipelineService.GetCustomRoles().subscribe(
        response => {
          this.customRoles = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getCustomForms(){
      this.pipelineService.GetCustomForms().subscribe(
        response => {
          this.customForms = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
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
          this.getFiles();
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
          this.getFiles();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    inactiveFile(id:number){
      this.pipelineService.InactiveFile(id).subscribe(
        response => {
          console.log('deleted file');
          this.getFiles();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getFiles(){
      this.pipelineService.GetOpportunityFiles(this.editItem.id).subscribe(
        response => {
          this.editItem.fileTypesByOpportunity = response;
          //console.log(this.editItem.fileTypesByOpportunity);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    showFile(fileData:OpportunityFileDTO){
      console.log('clicable');
      return 'data:image/jpeg;base64,' + fileData.fileDataString;
      //return this.sanitizer.bypassSecurityTrustUrl(fileData.fileData);
      //const fileURL = window.URL.createObjectURL(fileData.fileData);
      //const a = document.createElement('a');
      //a.href = fileURL;
      //a.download = 'downloaded-file'; // You can set the actual file name here if available
      //a.click();
      //window.URL.revokeObjectURL(fileURL);
    }

    downloadFile(fileData:OpportunityFileDTO){

      this.pipelineService.GetFileById(fileData.id).subscribe(
        response => {
          fileData = response;

          const src = `data:data:${fileData.contentType};base64,${fileData.fileDataString}`;
          const link = document.createElement("a")
          link.href = src
          link.download = fileData.fileName;
          link.click()
          
          link.remove()
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

     
    }

    downloadFileS3(fileData:OpportunityFileS3DTO){

      this.pipelineService.GetFileS3ByName(fileData.id).subscribe(
        response => {
          //fileData = response;
          var fileName = fileData.path.split('/')[1];
          //console.log(fileName);
          //return;

          //const src = `data:data:${fileData.contentType};base64,${fileData.fileDataString}`;
          //const link = document.createElement("a")
          //link.href = response.url;
          //link.download = fileName;
          //link.click()
          
          //link.remove()
          this.http.get(response.url, { responseType: 'blob' }).subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;  // your extracted filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          });

        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

     
    }

    previewFile(fileData:OpportunityFileDTO){
      this.pipelineService.GetFileById(fileData.id).subscribe(
        response => {
          fileData = response;

          const src = `${fileData.fileDataString}`;

          const byteCharacters = atob(src);
          const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: fileData.contentType });
          const previousUrl = URL.createObjectURL(blob);
          this.previewImage = this.sanitizer.bypassSecurityTrustResourceUrl(previousUrl);
          this.openPreviewImage = true;

          //const link = document.createElement("a")
          //link.href = src
          //link.download = fileData.fileName;
          //link.click()
          
          //link.remove()
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
   
    }

    previewFileS3(fileData:OpportunityFileDTO){

      this.pipelineService.GetFileS3ByName(fileData.id).subscribe(
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

    deleteNote(note: NotesDTO){
      this.pipelineService.DeleteNote(note).subscribe(
        response => {
          this.getNotes(note.idOpportunity);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    AddNote(event:any){
      let notesDto = {idOpportunity: this.idOpportunity, note: this.note, id: 0,createdDate: new Date()};

      if(this.editNoteItem.id > 0)
        notesDto.id = this.editNoteItem.id;

      this.pipelineService.AddNote(notesDto).subscribe(
        response => {
          console.log('add the pipeline done');
          this.getNotes(this.idOpportunity);
          this.editNoteItem = new NotesDTO(0,0,'',new Date());
          this.note = '';
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getPipeline(){
      this.pipelineService.GetPipelines().subscribe(
        response => {
          this.pipelineDictionary = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addPipelinePop(){
      this.pipelineEdit = new PipelineDTO(0,"",0,false,0,0);
      this.openPipelineDic = true;
    }

    addPipeline(){
      if(this.pipelineEdit.id == 0){
        this.pipelineService.AddPipeline(this.pipelineEdit).subscribe(
          response => {
            this.openPipelineDic = false;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.pipelineService.UpdatePipeline(this.pipelineEdit).subscribe(
          response => {
            this.openPipelineDic = false;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    editPipelinePop(pipeline: PipelineDTO){
      this.pipelineEdit = pipeline;
      this.openPipelineDic = true;
    }

    openWarnPipeline(pipeline: PipelineDTO, event:any){
      event.stopImmediatePropagation();
      this.pipelineEdit = pipeline;
      this.warnDeletePipeline = true;
    }

    openWarnCategory(category: CategoryDTO, event:any){
      event.stopImmediatePropagation();
      this.categoryEdit = category;
      this.warnDeleteCategory = true;
    }

    inactivePipeline(){
      this.pipelineService.InactivePipeline(this.pipelineEdit).subscribe(
        response => {
          this.warnDeletePipeline = false;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deletePipeline(pipelineEdit:PipelineDTO){
      this.pipelineService.InactivePipeline(pipelineEdit).subscribe(
        response => {
          this.pipelineService.GetPipelineByCategory(this.categoryEdit.id).subscribe(
            response => {
              this.pipelineDictionary = response;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addCategoryPop(){
      this.categoryEdit = new CategoryDTO(0,'');
      this.customRole = new CustomRolesDTO(0,'');
      this.customForm = new CustomFormDTO(0,'');
      this.openCategoryDic = true;
      this.pipelineDictionary = [];
    }

    editCategoryPop(category:CategoryDTO){
      this.categoryEdit = category;
      this.openCategoryDic = true;
      this.pipelineService.GetPipelineByCategory(this.categoryEdit.id).subscribe(
        response => {
          this.pipelineDictionary = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addCategory(){
      if(this.categoryEdit.id == 0){
        this.pipelineService.AddCategory(this.categoryEdit).subscribe(
          response => {
            this.openCategoryDic = false;
            this.getAllCategories();
            this.getCategory();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.pipelineService.UpdateCategory(this.categoryEdit).subscribe(
          response => {
            this.openCategoryDic = false;
            this.getAllCategories();
            this.getCategory();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    validateReviewForm(){

      if(this.reviewForm.additionalServices == ''){
        this.generalMessage = 'Please fill Additional Services';
        this.generalWarnMessage = true;
        return false;
      }

      if(this.reviewForm.discountDescription == ''){
        this.generalMessage = 'Please fill Discount Description';
        this.generalWarnMessage = true;
        return false;
      }

      if(this.reviewForm.howOpen == ''){
        this.generalMessage = 'Please fill How Open client is';
        this.generalWarnMessage = true;
        return false;
      }

      if(this.reviewForm.mainProduct == ''){
        this.generalMessage = 'Please fill Main Product';
        this.generalWarnMessage = true;
        return false;
      }

      return true;
    }

    validateGaveUpForm(){

      if(this.gaveUpForm.contactWays == ''){
        this.generalMessage = 'Please fill Kind of communicatation utilized';
        this.generalWarnMessage = true;
        return false;
      }

      if(this.gaveUpForm.kindOfOffer == ''){
        this.generalMessage = 'Please fill Kind of offer proposed';
        this.generalWarnMessage = true;
        return false;
      }

      if(this.gaveUpForm.whyGaveUp == ''){
        this.generalMessage = 'Please fill Why is gave up';
        this.generalWarnMessage = true;
        return false;
      }

      return true;
    }

    addReviewForm(){

      if(this.validateReviewForm() == false){
        return;
      }

      this.reviewForm.idOpportunity = this.selectedPipeline.id;

      this.pipelineService.AddReviewForm(this.reviewForm).subscribe(
          response => {
            //console.log('before openFormReview');
            this.openFormReview = false;
            //this.cd.detectChanges(); // force update
            //console.log('after openFormReview');
            this.handleDrop('', this.opportunityAfterReview,true);
            //console.log('after handleDrop');
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );   
    }

    addGaveUpForm(){

      if(this.validateGaveUpForm() == false){
        return;
      }

      this.gaveUpForm.idOpportunity = this.idOpportunity;

      this.pipelineService.AddGaveUpForm(this.gaveUpForm).subscribe(
          response => {
            //console.log('before openFormReview');
            this.openGaveUpForm = false;
            //this.cd.detectChanges(); // force update
            //console.log('after openFormReview');
            this.handleDrop('', this.opportunityAfterReview,true);
            //console.log('after handleDrop');
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );   
    }

    inactiveCategory(){
      this.pipelineService.InactiveCategory(this.categoryEdit).subscribe(
        response => {
          this.warnDeleteCategory = false;
          this.getAllCategories();
          this.getCategory();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openOpportunityDelete(pipelineItem: OpportunityPipelineDTO,event:any){
      event.stopImmediatePropagation();
      this.editItem = pipelineItem;
      this.warnDeleteOpportunity = true;
    }

    deleteOpportunity(){
      this.pipelineService.InactiveOpportunity(this.editItem).subscribe(
        response => {
          this.warnDeleteOpportunity = false;
          window.location.reload();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    updateOrder(pipelineDTO:PipelineDTO){

      pipelineDTO.idCategory = this.categoryEdit.id;

      this.pipelineService.UploadOrder(pipelineDTO).subscribe(
        response => {
          this.pipelineService.GetPipelineByCategory(this.categoryEdit.id).subscribe(
            response => {
              this.pipelineDictionary = response;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    resetEditTab(){
      this.editedTab = new PipelineDTO(0,'',0,false,0,0);
      this.customRole = new CustomRolesDTO(0,'');
      this.customForm = new CustomFormDTO(0,'');
    }

    addTab(){

      this.editedTab.idRole = this.customRole.id;
      this.editedTab.idForm = this.customForm.id;

      if(this.editedTab.id == 0){

        this.editedTab.idCategory = this.categoryEdit.id;

        this.pipelineService.AddPipeline(this.editedTab).subscribe(
          response => {
            this.pipelineService.GetPipelineByCategory(this.categoryEdit.id).subscribe(
              response => {
                this.pipelineDictionary = response;
                this.resetEditTab();
              },
              error => {
                console.error('Error:', error);  // Handle the error here
              }
            );
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.pipelineService.UpdatePipeline(this.editedTab).subscribe(
          response => {
            this.pipelineService.GetPipelineByCategory(this.categoryEdit.id).subscribe(
              response => {
                this.pipelineDictionary = response;
                this.resetEditTab();
              },
              error => {
                console.error('Error:', error);  // Handle the error here
              }
            );
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }

      
    }

    getTabs(setDefaultTab:boolean){
      this.pipelineService.GetPipelineByCategory(this.selectedCategoryPop.id).subscribe(
        response => {
          this.pipelinePop = response;
          if(setDefaultTab){
            this.setTab();
          }
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    setTab(){
      for(var i = 0;i < this.pipelinePop.length;i++){
        if(this.pipelinePop[i].id == this.editItem.idPipeline ){
          this.selectedPipelinePop = this.pipelinePop[i];
        }
      }
    }

    openBluePrint(id:number){
      window.location.href='/uikit/financecontrol/' + id;
    }

    openQuote(id:number){
      window.location.href='/uikit/quote/' + id;
    }

    constructor(private service: MessageService, private pipelineService: PipelineService,private el: ElementRef
      ,private sanitizer: DomSanitizer, private productService:ProductService
      , private salesService: SalesService,private userService: AuthenticationService
      , private userGroupService: UserGroupService
      ,private automationService: AutomationService,private cookieService: CookieService,private http: HttpClient,private cd: ChangeDetectorRef) {
        this.cookies = cookieService;
      }

    
}
