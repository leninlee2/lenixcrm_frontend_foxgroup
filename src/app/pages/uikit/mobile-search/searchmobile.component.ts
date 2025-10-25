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
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaymentService } from '../../service/payment.service';
import { CookieService } from 'ngx-cookie-service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { PipelineService } from '../../service/pipeline.service';
import { UserGroupService } from '../../service/usergroup.service';
import { UserGroupDTO } from '../../../dto/usergroupdto';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { OpportunityDTO } from '../../../dto/opportunitydto';
import { CriticityDTO } from '../../../dto/criticitydto';
import { AutomationService } from '../../service/automation.service';
import { AuthenticationService } from '../../service/authentication.service';
import { OpportunityFileDTO } from '../../../dto/opportunityfiledto';
import { SalesService } from '../../service/sales.service';
import { ProductService } from '../../service/product.service';
import { ProductServiceDTO } from '../../../dto/productservicedto';
import { PipelineDTO } from '../../../dto/pipelinedto';
import { FileTypeDTO } from '../../../dto/filetypedto';
import { CustomRolesDTO } from '../../../dto/customrolesdto';
import { CustomFormDTO } from '../../../dto/customformdto';
import { DashboardQtde } from '../../../dto/dashboardqtde';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-search-mobile',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,DatePickerModule,
      AutoCompleteModule,AvatarModule
    ],
    templateUrl: './searchmobile.component.html',
    styleUrl: './searchmobile.component.css',
    providers: [MessageService]
})
export class SearchMobileComponent  implements OnInit {
    id: string | null = null;
    cookie: CookieService;
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    step:number = 0;
    generalWarnMessage:boolean = false;
    generalMessage:string = '';
    user:string = '';
    userGroups:UserGroupDTO[] = [];
    isOwner:boolean = false;
    statuses:any;
    selectedCategory:any;
    selectedCategoryPop:any;
    availablePipelines:OpportunityDTO[] = [];
    opportunityCount:number = 0;
    oportunitiestable:any = [];
    salesCustomFilter:SalesmanDTO = new SalesmanDTO(0,'',0);
    categories:any;
    criticities:CriticityDTO[] = [];
    allProfilePics:OpportunityFileDTO[] = [];
    salesmans:SalesmanDTO[] = [];
    salesCustomerFilter:SalesmanDTO[] = [];
    productServices:ProductServiceDTO[] = [];
    pipelineDictionary:PipelineDTO[] = [];
    pipelineDictionaryFilter:PipelineDTO[] = [];
    selectedPipeline:PipelineDTO = new PipelineDTO(0,'',0,true,0,0);
    fileTypes:FileTypeDTO[] = [];
    customRoles:CustomRolesDTO[] = [];
    customForms:CustomFormDTO[] = [];
    dashboardQtdes:DashboardQtde[] = [];
    nameCustomer:string = '';
    nameCustomerFilter:string = '';

    ngOnInit(): void {
      this.user = this.cookie.get('email');
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

    openOpportunity(id:number){
      window.location.href='/uikit/edopmobile/' + id;
    }

    searchByCustomer(){
        this.nameCustomerFilter =this.nameCustomer;
    }

    validateCustomer(opportunityPipeline:OpportunityPipelineDTO){
        if(this.nameCustomerFilter != ''){
            return opportunityPipeline.nameCustomer.toLowerCase().indexOf(this.nameCustomerFilter.toLowerCase()) >= 0;
        }else{
            return true;
        }
    }

    getUserIcon(name:string){
      let myArray: string[] = name.split(" ");
      let iconname = '';
      for(var i = 0;i < myArray.length;i++){
        iconname += myArray[i].charAt(0).toUpperCase();
      }
      return iconname;
    }

    getImageProfile(opportunity:OpportunityPipelineDTO){
      let userFile = this.allProfilePics.filter(item =>
          item.idUser == opportunity.idUser
        )[0]

      return `data:${userFile.contentType};base64,${userFile.fileDataString}`;
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

    hasProfileImage(opportunity:OpportunityPipelineDTO){
      if(opportunity.idUser > 0)
        return this.checkImagePic(opportunity.idUser);
      else
        return false;
    }

    filterTab(){
      this.pipelineDictionaryFilter = this.pipelineDictionary.filter(pipeline => pipeline.idCategory == this.selectedCategory.id);
    }

    refreshCategory(){
      this.filterTab();
      this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter,0);
    }

    refreshPipeline(){
      this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter,this.selectedPipeline.id);  
    }

    getDashboardQtde(){
      this.pipelineService.GetDashboardQtde().subscribe(
        response => {
          this.dashboardQtdes = response;
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

    getPipeline(){
      this.pipelineService.GetPipelines().subscribe(
        response => {
          this.pipelineDictionary = response;
          this.filterTab();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllProducts(){
      this.productService.GetProductServices().subscribe(
        response => {
          this.productServices = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
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

    countPipelines(){
      this.opportunityCount = 0;
      this.oportunitiestable = [];
      for(var i = 0;i < this.availablePipelines.length;i++){
        this.opportunityCount+= this.availablePipelines[i].opportunityPipeline.length;
        this.fillOpportunityRow(this.availablePipelines[i].opportunityPipeline);
      }
    }

    getOpportunityPipeline(idCategory:number,salesCustomFilter:SalesmanDTO,idPipeline:number){
          this.pipelineService.GetOpportunityPipelinesAllFilter(idCategory,salesCustomFilter,this.user).subscribe(
            response => {
              this.availablePipelines = response;

              if(idPipeline > 0){
                this.availablePipelines = this.availablePipelines.filter(op => op.idPipeline == idPipeline);
              }

              this.countPipelines();
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
          this.filterTab();
          this.getOpportunityPipeline(this.selectedCategory.id,this.salesCustomFilter,0);
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

    next(){
        this.step+=1;
    }

    saveOpportunity(){
        this.pipelineService.Add(this.opportunity).subscribe(
          response => {
            this.generalMessage = 'The Opportunity was created';
            this.generalWarnMessage = true;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    closeScreen(){
        window.location.href='/uikit/mobilehome';
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute, private pipelineService: PipelineService
      ,private paymentService: PaymentService,private cookieService: CookieService,private userGroupService: UserGroupService
      ,private automationService: AutomationService,private userService: AuthenticationService, private salesService: SalesService
      , private productService:ProductService
    ) {
      this.cookie = cookieService;
    }

    
}
