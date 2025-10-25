import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, OnInit } from '@angular/core';
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
import { LoginDTO } from '../../../dto/logindto';
import { AuthenticationService } from '../../service/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { AccessGroupDTO } from '../../../dto/accessgroupdto';
import { UserGroupService } from '../../service/usergroup.service';
import { UserGroupDTO } from '../../../dto/usergroupdto';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUpload } from 'primeng/fileupload';
import { ApiUrl } from '../../service/constants';
import { AvatarModule } from 'primeng/avatar';
import { OpportunityFileDTO } from '../../../dto/opportunityfiledto';
import { GroupMenuDTO } from '../../../dto/groupmenudto';
import { CookieService } from 'ngx-cookie-service';
import { PipelineService } from '../../service/pipeline.service';
import { CategoryDTO } from '../../../dto/categorydto';

@Component({
    selector: 'user-contact',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, 
      FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule
      ,PasswordModule,AutoCompleteModule,FileUpload,AvatarModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    providers: [MessageService]
})
export class UserComponent  implements OnInit {
    
    selectedPipeline:any;
    users:LoginDTO[] = [];
    name:string = '';
    email:string = '';
    password:string = '';
    phone:string = '';
    openedUser:boolean = false;
    id:number = 0;
    user!:LoginDTO;
    openedGroup:boolean = false;
    openedGroupDetail:boolean = false;
    accessGroup:AccessGroupDTO = new AccessGroupDTO(0,'',new Date(), true);
    accessGroups:AccessGroupDTO[] = [];
    userGroup:UserGroupDTO = new UserGroupDTO(0,0,0,new Date(),true);
    groupByUser:AccessGroupDTO = new AccessGroupDTO(0,'',new Date(), true);
    filteredGroups:AccessGroupDTO[] = [];
    userGroups:UserGroupDTO[] = [];
    index:string = "0";
    uploadFileData:any;
    fileUrl:string = ApiUrl + '/user/uploadfile';
    userFile!:OpportunityFileDTO;
    avatarImageUrl:string = '';
    groupMenus:GroupMenuDTO[] = [];
    groupPipelines:GroupMenuDTO[] = [];
    menus:GroupMenuDTO[] = [];
    menu:GroupMenuDTO = new GroupMenuDTO(0,0,'',true,new Date());
    cookie: CookieService;
    userName:string = '';
    categories:CategoryDTO[] = [];
    category:CategoryDTO = new CategoryDTO(0,'');
    currentAccessGroup:AccessGroupDTO = new AccessGroupDTO(0,'',new Date(),true);
    isOwner:boolean = false;

    ngOnInit(): void {
      this.userName = this.cookie.get('email');
      this.isOwner = this.cookie.get('isOwner') == "true";
      this.user = new LoginDTO('','','', '', new Date(),0,'',0);
      this.getAllUsers();
      this.getAllGroups();
      this.getMenusByUser();
      this.getCategories();
    }

    getCategories(){
      this.pipelineService.GetCategory(this.userName).subscribe(
        response => {
          this.categories = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getMenusByUser(){
      this.authenticationService.GetFormatMenus(this.userName).subscribe(
        response => {
          this.menus = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    uploadFile(){
      const formData = new FormData();
      formData.append('file', this.uploadFileData);
      formData.append('idUser', this.user.id.toString());
      this.authenticationService.UploadFile(formData).subscribe(
        response => {
          this.user.idFile = response.id;
          this.userFile = response;
          this.avatarImageUrl = `data:${this.userFile.contentType};base64,${this.userFile.fileDataString}`;
          console.log('uploaded file');
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

    onUpload(event:any){
      //just for compatibility
    }

    onFileSelect(event:any){
      this.uploadFileData = event.files[0];
    }

    filterGroups(event: any) {
      const query = event.query.toLowerCase();
      this.filteredGroups = this.accessGroups.filter(item =>
        item.name.toLowerCase().includes(query)
      );
    }

    getAllUsers(){
      this.authenticationService.GetAllUsers().subscribe(
        response => {
          this.users = response;
          console.log(this.users);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllGroups(){
      this.userGroupService.GetAccessGroups().subscribe(
        response => {
          this.accessGroups = response;
          console.log(this.users);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getMenusByGroups(idGroup:number){
      console.log(idGroup);
      this.userGroupService.GetMenusByGroup(idGroup).subscribe(
        response => {
          this.groupMenus = response;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getPipelinesByGroups(idGroup:number){
      console.log(idGroup);
      this.userGroupService.GetPipelinesByGroup(idGroup).subscribe(
        response => {
          this.groupPipelines = response;
          console.log(this.groupPipelines);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    getAllGroupsByUser(){
      console.log('trigger search');
      this.userGroupService.GetByIdUser(this.user.id).subscribe(
        response => {
          this.userGroups = response;
          console.log(this.userGroups);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openUser(user: LoginDTO, index:string, event:any){
      this.avatarImageUrl = '';
      this.index = index;
      this.user = user;    
      this.getFileById();
    }

    openPayments(user: LoginDTO, index:string, event:any){
      window.location.href='/uikit/payment/' + user.id;
    }

    openGroupMenu(group: AccessGroupDTO, event:any){
      this.openedGroupDetail = true;
      this.currentAccessGroup = group;
      this.getMenusByGroups(group.id);
      this.getPipelinesByGroups(group.id);
    }

    getFileById(){
      console.log(this.user.idFile);
      if(this.user.idFile > 0){
        this.authenticationService.GetFileById(this.user.idFile).subscribe(
          response => {
            this.userFile = response;
            this.avatarImageUrl = `data:${this.userFile.contentType};base64,${this.userFile.fileDataString}`;
            this.openedUser = true;
            this.getAllGroupsByUser();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.openedUser = true;
        this.getAllGroupsByUser();
      }
    }

    hasProfileImage(){
      if(this.user.idFile > 0 && this.userFile != null)
        return true;
      else
        return false;
    }

    openNewUser(){
        this.openedUser = true;
    }

    openGroupPopup(){
      this.getAllGroups();
      this.openedGroup = true;
    }

    closeUser(){
        this.openedUser = false;
    }

    closeGroup(){
      this.openedGroup = false;
    }

    saveUser(){
      if(this.user.id == 0){
        this.saveDataUser();
      }else{
        this.editDataUser();
      }
    }

    saveDataUser(){
      this.authenticationService.Add(this.user).subscribe(
        response => {
          //console.log(this.users);
          this.openedUser = false;
          this.getAllUsers();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    saveGroup(){
      if(this.accessGroup.id == 0){
        this.userGroupService.AddAccessGroup(this.accessGroup).subscribe(
          response => {
            this.getAllGroups();
            this.resetGroup();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.userGroupService.UpdateAccessGroup(this.accessGroup).subscribe(
          response => {
            this.getAllGroups();
            this.resetGroup();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      } 
    }

    saveGroupMenu(){
       var groupMenu = new GroupMenuDTO(0,this.currentAccessGroup.id,this.menu.name,true,new Date());

       this.userGroupService.AddGroupMenu(groupMenu).subscribe(
          response => {
            this.getMenusByGroups(this.currentAccessGroup.id);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
       );
    }

    InactivateGroupMenu(groupMenu:GroupMenuDTO,event:any){

       this.userGroupService.InactivateGroupMenu(groupMenu).subscribe(
          response => {
            this.getMenusByGroups(this.currentAccessGroup.id);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
       );
    }

    saveGroupPipeline(){

       this.userGroupService.AddGroupPipeline(this.currentAccessGroup.id,this.category.id).subscribe(
          response => {
            this.getPipelinesByGroups(this.currentAccessGroup.id);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
       );
    }

    inactivateGroupPipeline(groupPipeline:any,event:any){

       this.userGroupService.InactivateGroupPipeline(groupPipeline).subscribe(
          response => {
            this.getPipelinesByGroups(this.currentAccessGroup.id);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
       );
    }

    editDataUser(){
      this.authenticationService.Update(this.user).subscribe(
        response => {
          //console.log(this.users);
          this.openedUser = false;
          this.getAllUsers();
          this.getAllGroupsByUser();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    editAcessGroup(accessGroup:AccessGroupDTO,event:any){
      this.accessGroup = accessGroup;
    }

    getGroupLabelName(){
      return this.accessGroup.id > 0?"Edit":"Save";
    }

    resetGroup(){
      this.accessGroup = new AccessGroupDTO(0,'',new Date(),true);
    }

    deleteGroup(accessGroup:AccessGroupDTO,event:any){
      this.userGroupService.InactivateAccessGroup(accessGroup).subscribe(
        response => {
          this.getAllGroups();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deleteUserGroup(userGroup:UserGroupDTO,event:any){
      this.userGroupService.InactivateUserGroup(userGroup).subscribe(
        response => {
          this.resetUserGroup();
          this.getAllGroupsByUser();
          this.getAllUsers();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    deleteUser(loginDTO:LoginDTO,event:any){
      this.authenticationService.Inactivate(loginDTO).subscribe(
        response => {
          this.resetUserGroup();
          this.getAllGroupsByUser();
          this.getAllUsers();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    addUserGroup(event:any){
      console.log('triggered event');
      //console.log(this.groupByUser);
      //console.log(this.user);

      this.userGroup = new UserGroupDTO(0,this.user.id,this.groupByUser.id,new Date(),true);

      this.userGroupService.AddUserGroup(this.userGroup).subscribe(
        response => {
          this.resetUserGroup();
          this.getAllGroupsByUser();
          this.getAllUsers();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );

    }

    editGroupDetail(){
      
    }

    resetUserGroup(){
      this.userGroup = new UserGroupDTO(0,0,0,new Date(),true);
    }

    checkedAll: any;
    
    constructor(private service: MessageService
      , private authenticationService: AuthenticationService
      , private userGroupService: UserGroupService,private cookieService: CookieService, private pipelineService: PipelineService) {
        this.cookie = cookieService;
      }

    
}
