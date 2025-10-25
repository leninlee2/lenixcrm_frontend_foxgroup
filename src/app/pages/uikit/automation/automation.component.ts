import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, AfterViewInit , ViewChild } from '@angular/core';
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
import { AuthenticationService } from '../../service/authentication.service';
import { TooltipModule } from 'primeng/tooltip';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AutomationService } from '../../service/automation.service';
import { CriticityDTO } from '../../../dto/criticitydto';
import { ColorPickerModule } from 'primeng/colorpicker';
import { WorkflowTableDTO } from '../../../dto/workflowtabledto';
import { SysTableDTO } from '../../../dto/systabledto';
import { WorkflowFieldDTO } from '../../../dto/workflowfielddto';
import { SysColumnDTO } from '../../../dto/syscolumndto';
import { WorkflowAutomationDTO } from '../../../dto/workflowautomationdto';
import { GeneralTaskTreeDTO } from '../../../dto/generaltasktreedto';
import { TreeTableModule } from 'primeng/treetable';
import { WorkflowItemOrGroupDTO } from '../../../dto/workflowItemorgroup';
import { TreeModule } from 'primeng/tree';
import { GeneralTaskItemDTO } from '../../../dto/generaltaskItemdto';
import { OperatorDTO } from '../../../dto/operatordto';
import { WorkflowTemplateDTO } from '../../../dto/workflowtemplatedto';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-automation',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,
      DragDropModule,CardModule,TabsModule,SelectModule,TableModule
      ,DialogModule,AvatarModule,FileUploadModule,DatePickerModule,ToggleSwitchModule
      ,AutoCompleteModule,BadgeModule,ProgressBarModule,TooltipModule,ColorPickerModule,TreeTableModule,TreeModule],
    templateUrl: './automation.component.html',
    styleUrl: './automation.component.css',
    providers: [MessageService]
})
export class AutomationComponent  implements OnInit, AfterViewInit {
    
    selectedPipeline:any;
    statuses:any;
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
    openCriticity:boolean = false;
    criticity:CriticityDTO = new CriticityDTO(0,'','',true);
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
    criticities:CriticityDTO[] = [];
    salesCustomerFilter:SalesmanDTO[] = [];
    salesman:SalesmanDTO = new SalesmanDTO(0,'',1);
    salesCustomFilter:SalesmanDTO = new SalesmanDTO(0,'',0);
    pAppointment:Date | null = null;
    fileTypes:FileTypeDTO[] = [];
    fileType:FileTypeDTO = new FileTypeDTO(0,'',[],[]);
    openWorkflowTablePop:boolean = false;
    openWorkflowFieldPop:boolean = false;
    openWorkflowAutomation:boolean = false;
    totalSize:number = 0;
    totalSizePercent:number = 0;
    fileTypeForSave:FileTypeDTO = new FileTypeDTO(0,'',[],[]);
    uploadedFiles:any;
    warnFileType:boolean = false;
    fileColumns = [1, 2, 3, 4, 5];
    saleCustomname:string = '';
    allProfilePics:OpportunityFileDTO[] = [];
    openPreviewImage:boolean = false;
    previewImage: SafeResourceUrl | null = null;
    workflowTables:WorkflowTableDTO[] = [];
    systables:SysTableDTO[] = [];
    workflowTable:WorkflowTableDTO = new WorkflowTableDTO(0,0,'','',new Date(),true);
    workflowField:WorkflowFieldDTO = new WorkflowFieldDTO(0,0,'','','','',new Date(),true);
    systable:SysTableDTO = new SysTableDTO(0,'');
    workflowFields:WorkflowFieldDTO[] = [];
    sysColumns:SysColumnDTO[] = [];
    sysColumn:SysColumnDTO = new SysColumnDTO(0,'','');
    workfield:WorkflowFieldDTO = new WorkflowFieldDTO(0,0,'','','','',new Date(),true);
    workflowAutomations:WorkflowAutomationDTO[] = [];
    workflowAutomation:WorkflowAutomationDTO = new WorkflowAutomationDTO(0,'',new Date(),true,0,0,'',0,0);
    workflowGroups:GeneralTaskItemDTO[] = [];
    openRole:boolean = false;
    filterWorkflowFields:WorkflowFieldDTO[] = [];
    fieldForAutomation:WorkflowFieldDTO = new WorkflowFieldDTO(0,0,'','','','',new Date(),true);
    operators:OperatorDTO[] = [];
    unities:OperatorDTO[] = [];
    operator:OperatorDTO = new OperatorDTO('');
    unity:OperatorDTO = new OperatorDTO('');
    role:WorkflowItemOrGroupDTO = new WorkflowItemOrGroupDTO(0,0,0,new Date(),true,0,'','','',false,'','');
    automationParentId:number = 0;
    workflowActions: WorkflowAutomationDTO[] = [];
    action: WorkflowAutomationDTO = new WorkflowAutomationDTO(0,'', new Date(), true,0,0,'',0,0);
    criticityPop:CriticityDTO = new CriticityDTO(0,'','',true);
    templates:WorkflowTemplateDTO[] = [];
    template:WorkflowTemplateDTO = new WorkflowTemplateDTO(0,'','',new Date(),true);
    tabs:PipelineDTO[] = [];
    tab:PipelineDTO = new PipelineDTO(0,'',0,true,0,0);
    finalTab:PipelineDTO = new PipelineDTO(0,'',0,true,0,0);
    disableOperator:boolean = false;
    cookies:CookieService;
    user:string = '';
    
    ngOnInit(): void {
      this.user = this.cookies.get('email');
      this.getOperators();
      this.getUnities();
      this.getActions();
      this.getAllCriticities();
      this.getAllWorkflowTables();
      this.getAllSysTables();
      this.getAllFields();
      this.getAllWorkflowAutomation();
      this.getTemplates();
      this.getAllTabs();
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }

    getAllTabs(){
      this.automationService.GetTabs().subscribe(
        response => {
          this.tabs = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getTemplates(){
      this.automationService.GetTemplates().subscribe(
        response => {
          this.templates = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getActions(){
      this.automationService.GetActions().subscribe(
        response => {
          this.workflowActions = response;
          console.log(this.workflowActions);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getOperators(){
      this.automationService.GetOperators().subscribe(
        response => {
          this.operators = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getUnities(){
      this.automationService.GetUnities().subscribe(
        response => {
          this.unities = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openTaskItemNew(node:GeneralTaskTreeDTO){
        //this.generalItemTask = new GeneralTaskItemDTO(node.id,node.idGeneralTask,'',this.dateFilter,node.parentId,false,true,false);
        //this.openedTask = true;
    }

    openRolePopUp(node:GeneralTaskTreeDTO){
        this.automationParentId = node.id;
        this.openRole = true;
    }

    inactiveRole(node:GeneralTaskTreeDTO){
        this.automationService.InactiveRole(node.id).subscribe(
          response => {
            this.getAllWorkflowGroups(this.workflowAutomation.id);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
        }
      );
    }

    updateDone(event:any, node:GeneralTaskTreeDTO){
          //var taskItem = new GeneralTaskItemDTO(node.id,0,'',new Date(),0,node.done,true,false);
          //this.nodeService.UpdateDoneTask(taskItem).subscribe(
          //  response => {
          //    //this.getAllTasks();
          //  },
          //  error => {
          //    console.error('Error:', error);  // Handle the error here
          //  }
          //);
    }

    getAllWorkflowAutomation(){
      this.automationService.GetAllWorkflowAutomation().subscribe(
        response => {
          this.workflowAutomations = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getSysColumns(event:any,defaultName:string){
      this.automationService.GetSysColumns(this.workflowTable.idSTable).subscribe(
        response => {
          this.sysColumns = response;
          if(defaultName != ''){
            this.getDefaultSysColumn(defaultName);
          }
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    checkOperator(event:any){
      this.disableOperator = false;
      this.getOperators();
      if(this.fieldForAutomation.name == 'Tab'){
        this.setOperatorBlock('=');
      }
    }

    setOperatorBlock(value:string){
      for(var i = 0;i < this.operators.length;i++){
        if(this.operators[i].name = value){
          this.operator = this.operators[i];
          this.disableOperator = true;
        }
      }
    }

    getFilteredFields(event:any){
      this.filterWorkflowFields = this.workflowFields.filter(field => field.idTable == this.workflowTable.id )
    }

    getDefaultSysColumn(defaultName:string){
      for(var i = 0;i < this.sysColumns.length;i++){
        if(this.sysColumns[i].name == defaultName)
          this.sysColumn = this.sysColumns[i];
      }
    }

    getAllFields(){
      this.automationService.GetWorkflowFields().subscribe(
        response => {
          this.workflowFields = response;
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

    getAllWorkflowTables(){
      this.automationService.GetAllWorkflowTables().subscribe(
        response => {
          this.workflowTables = response;
          console.log(this.workflowTables);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllSysTables(){
      this.automationService.GetSysTables().subscribe(
        response => {
          this.systables = response;
          console.log(this.systables);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
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

    inactiveWorkflowTable(workflowTable: WorkflowTableDTO, event:any){
      event.stopImmediatePropagation();
      this.workflowTable = workflowTable;
      this.automationService.InactivateWorkflowTable(this.workflowTable).subscribe(
          response => {
            this.getAllWorkflowTables();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    inactiveWorkflowAutomation(workflowAutomation: WorkflowAutomationDTO, event:any){
      event.stopImmediatePropagation();
      this.automationService.InactivateWorkflowAutomation(workflowAutomation).subscribe(
          response => {
            this.getAllWorkflowAutomation();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    inactiveWorkflowField(workflowField: WorkflowFieldDTO, event:any){
      event.stopImmediatePropagation();
      this.workflowField = workflowField;
      this.automationService.InactivateWorkflowField(this.workflowField).subscribe(
          response => {
            this.getAllFields();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    addWorkflowTablePop(){
      this.workflowTable = new WorkflowTableDTO(0,0,'','',new Date(),true);
      this.openWorkflowTablePop = true;
    }

    addWorkflowAutomationPop(){
      this.workflowAutomation = new WorkflowAutomationDTO(0,'',new Date(),true,0,0,'',0,0);
      this.workflowGroups = [];
      this.openWorkflowAutomation = true;
    }

    addWorkflowFieldPop(){
      this.workflowField = new WorkflowFieldDTO(0,0,'','','','',new Date(),true);
      this.openWorkflowFieldPop = true;
    }

    addWorkflowTable(){

      this.workflowTable.name = this.systable.name;
      this.workflowTable.idSTable = this.systable.id;

      if(this.workflowTable.id == 0){
        this.automationService.AddWorkflowTable(this.workflowTable).subscribe(
          response => {
            this.openWorkflowTablePop = false;
            this.getAllWorkflowTables();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.automationService.UpdateWorkflowTable(this.workflowTable).subscribe(
          response => {
            this.openWorkflowTablePop = false;
            this.getAllWorkflowTables();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    addWorkflowField(){

      this.workflowField.idTable = this.workflowTable.id;
      this.workflowField.tableName = this.workflowTable.alias;
      this.workflowField.realName = this.sysColumn.name;
      this.workflowField.dataType = this.sysColumn.dataType;

      if(this.workflowField.id == 0){
        this.automationService.AddWorkflowField(this.workflowField).subscribe(
          response => {
            this.openWorkflowFieldPop = false;
            this.getAllFields();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.automationService.UpdateWorkflowField(this.workflowField).subscribe(
          response => {
            this.openWorkflowFieldPop = false;
            this.getAllFields();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    editWorkflowTable(workflowTable:WorkflowTableDTO){
      this.workflowTable = workflowTable;
      this.getSystemTable(this.workflowTable.idSTable);
      this.openWorkflowTablePop = true;
    }

    editWorkflowAutomation(workflowAutomation:WorkflowAutomationDTO){
      this.workflowAutomation = workflowAutomation;
      this.getAllWorkflowGroups(this.workflowAutomation.id);
      this.getAction(this.workflowAutomation.idAction);

      if(this.workflowAutomation.idCriticity > 0){
        this.getCriticality(this.workflowAutomation.idCriticity);
      }

      if(this.workflowAutomation.idTemplate > 0){
        this.getTemplate(this.workflowAutomation.idTemplate);
      }

      if(this.workflowAutomation.idPipeline > 0){
        this.getTabPop(this.workflowAutomation.idPipeline);
      }

      this.openWorkflowAutomation = true;
    }

    getTabPop(id:number){
      for(var i = 0;i < this.tabs.length;i++){
        if(this.tabs[i].id ==id)
          this.finalTab = this.tabs[i];
      }
    }

    getTemplate(id:number){
      for(var i = 0;i < this.templates.length;i++){
        if(this.templates[i].id ==id)
          this.template = this.templates[i];
      }
    }

    getCriticality(id:number){
      for(var i = 0;i < this.criticities.length;i++){
        if(this.criticities[i].id ==id)
          this.criticityPop = this.criticities[i];
      }
    }

    getAllWorkflowGroups(idWorkflow:number){
      this.automationService.GetAllWorkflowGroups(idWorkflow).subscribe(
        response => {
          this.workflowGroups = response;
          console.log(this.workflowGroups);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    penTaskItemNew(node:GeneralTaskTreeDTO){
        //this.generalItemTask = new GeneralTaskItemDTO(node.id,node.idGeneralTask,'',this.dateFilter,node.parentId,false,true,false);
        //this.openedTask = true;
    }

    editWorkflowField(workflowField:WorkflowFieldDTO){
      this.workflowField = workflowField;
      this.getCustomTable(this.workflowField.id);
      this.getSysColumns('',this.workflowField.realName);
      this.openWorkflowFieldPop = true;
    }

    getCustomTable(id:number){
      for(var i = 0;i < this.workflowTables.length;i++){
        if(this.workflowTables[i].id == id){
          this.workflowTable = this.workflowTables[i];
        }     
      }
    }

    getSystemTable(id:number){
      for(var i = 0;i < this.systables.length;i++){
        if(this.systables[i].id == id)
          this.systable = this.systables[i];
      }
    }

    ngAfterViewInit() {
      // Optionally, set the tab after view initialization to ensure it works
      setTimeout(() => {
        this.index = "0";  // Select Tab 2
      }, 0);
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
          if(columnNumber < item.opportunityFiles.length)
            columnNumber = item.opportunityFiles.length;
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

      if(this.appointment != null && this.appointment != '')
        this.pAppointment = new Date(this.appointment);

      this.selectedCategoryPop = {id:this.editItem.idCategory,name:this.editItem.nameCategory};
      this.getProduct(this.editItem.idProduct);
      this.getTabs(true);
      console.log(this.editItem);
      this.getNotes(this.editItem.id);
    }

    getProduct(id:number){
      for(var i = 0;i < this.productServices.length;i++){
        if(this.productServices[i].id == id){
          this.productItem = this.productServices[i];
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
    }

    closeOpportunity(){
      this.newPipeline = false;
      this.editPipeline = false;
      this.openPipeline = false;
    }

    isVisiblePipeline(){
      return this.editPipeline || this.newPipeline;
    }

    getCategory(){
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
      dragStart(item: any) {
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
      handleDrop(event: any, opportunity: OpportunityDTO) {
        
        this.addNextQueue(opportunity.idPipeline);
        //this.selectedPipelines.push(this.selectedPipeline);
        // Optionally, remove from availableProducts
        //this.availablePipelines = this.availablePipelines.filter(
        //  (item) => item.idPipeline !== this.selectedPipeline.idPipeline
        //);
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
        , '',this.dateFake,this.dateFake, '',0,0,0,'', new Date(), this.user , '');

      this.pipelineService.Update(this.updatedPipeline).subscribe(
        response => {
          console.log('update the pipeline done');
          this.selectedPipeline.idPipeline = idPipeline;
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

    uploadFiles(fileItem:any){
      const formData = new FormData();
      formData.append('file', fileItem);
      formData.append('idOpportunity', this.idOpportunity.toString());
      formData.append('fileTypeId', this.fileTypeForSave.id.toString());
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

    previewFile(fileData:OpportunityFileDTO){
      console.log('test');
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

    editPipelinePop(pipeline: PipelineDTO){
      this.pipelineEdit = pipeline;
      this.openPipelineDic = true;
    }

    openWarnPipeline(pipeline: PipelineDTO, event:any){
      event.stopImmediatePropagation();
      this.pipelineEdit = pipeline;
      this.warnDeletePipeline = true;
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

    deleteCriticity(criticity:CriticityDTO,event:any){
      this.automationService.InactivateCriticity(criticity).subscribe(
        response => {
          this.getAllCriticities();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addCriticityPop(){
      this.criticity = new CriticityDTO(0,'','',true);
      this.openCriticity = true;
    }

    editCriticityPop(criticity:CriticityDTO){
      this.criticity = criticity;
      this.openCriticity = true;
    }

    addCriticity(){
      if(this.criticity.id == 0){
        this.automationService.AddCriticity(this.criticity).subscribe(
          response => {
            this.openCriticity = false;
            this.getAllCriticities();
          },
          error => {
            console.error('Error:', error);
          }
        );
      }else{
        this.updateCriticity(this.criticity,'');
      }
      
    }

    addRole(){
      this.role.field = this.fieldForAutomation.name;
      this.role.idAction = 0;
      this.role.idWorkflow = this.workflowAutomation.id;
      this.role.isGroup = false;
      this.role.parentId = this.automationParentId;
      this.role.operator = this.operator.name;
      this.role.unity = this.unity.name;

      if(this.role.field == 'Tab'){
        this.role.startValue = this.tab.id.toString();
      }

      this.automationService.AddRole(this.role).subscribe(
          response => {
            this.openRole = false;
            this.getAllWorkflowGroups(this.workflowAutomation.id);
          },
          error => {
            console.error('Error:', error);
          }
      );
      
    }

    getAction(id:number){
      for(var i = 0;i < this.workflowActions.length;i++){
        if(this.workflowActions[i].id == id)
          this.action = this.workflowActions[i];
      }
    }

    addWorkflowAutomation(){

      this.workflowAutomation.idAction = this.action.id;
      this.workflowAutomation.idCriticity = this.criticityPop.id;
      this.workflowAutomation.idTemplate = this.template.id;
      this.workflowAutomation.idPipeline = this.finalTab.id;

      if(this.workflowAutomation.id == 0){
        this.automationService.AddWorkflowAutomation(this.workflowAutomation).subscribe(
          response => {
            this.openWorkflowAutomation = false;
            this.getAllWorkflowAutomation();
          },
          error => {
            console.error('Error:', error);
          }
        );
      }else{
        this.automationService.UpdateWorkflowAutomation(this.workflowAutomation).subscribe(
          response => {
            this.openWorkflowAutomation = false;
            this.getAllWorkflowAutomation();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }
      
    }

    updateCriticity(criticity:CriticityDTO,event:any){
        this.automationService.UpdateCriticity(criticity).subscribe(
          response => {
            this.openCriticity = false;
            this.getAllCriticities();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    inactiveCriticity(){
      this.automationService.InactivateCriticity(this.criticity).subscribe(
        response => {
          //this.warnDeleteCategory = false;
          //window.location.reload();
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

    resetEditTab(){
      this.editedTab = new PipelineDTO(0,'',0,false,0,0);
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
      ,private automationService: AutomationService,private cookieService: CookieService) {
        this.cookies = cookieService;
      }

    
}
