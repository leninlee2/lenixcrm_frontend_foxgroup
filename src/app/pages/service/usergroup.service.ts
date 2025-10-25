import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { AccessGroupDTO } from '../../dto/accessgroupdto';
import { UserGroupDTO } from '../../dto/usergroupdto';
import { GroupMenuDTO } from '../../dto/groupmenudto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class UserGroupService {
    private apiUrlGetAcessGroup = ApiUrl + '/accessgroup/all';
    private apiUrlAddGroup = ApiUrl + '/accessgroup/add';
    private apiUrlUpdateGroup = ApiUrl + '/accessgroup/updategroup';
    private apiUrlInactivateGroup = ApiUrl + '/accessgroup/inactivategroup';
    private apiUrlMenuByGroup = ApiUrl + '/accessgroup/getmenusbygroup';
    
    // User Groups
    private apiUrlGetUserGroup = ApiUrl + '/usergroup/byuserid';
    private apiUrlGetUserGroupByName = ApiUrl + '/usergroup/byusername';
    private apiUrlAddUserGroup = ApiUrl + '/usergroup/add';
    private apiUrlInactivateUserGroup = ApiUrl + '/usergroup/inactivate';
    private apiUrlGetPipelineByGroup = ApiUrl + '/usergroup/getpipelinesbygroup';
    private apiUrlAddGroupMenu = ApiUrl + '/usergroup/addgroupmenu';
    private apiUrlAddGroupPipeline = ApiUrl + '/usergroup/addgrouppipeline';
    private apiUrlInactivateGroupMenu = ApiUrl + '/usergroup/inactivategroupmenu';
    private apiUrlInactivateGroupPipeline = ApiUrl + '/usergroup/inactivategrouppipeline';

    constructor(private http: HttpClient) {}

    
    GetAccessGroups(): Observable<AccessGroupDTO[]> {
        return this.http.get<AccessGroupDTO[]>(this.apiUrlGetAcessGroup);
    }

    GetMenusByGroup(idGroup:number): Observable<GroupMenuDTO[]> {
        var url = this.apiUrlMenuByGroup + '?idGroup=' + idGroup;
        return this.http.get<GroupMenuDTO[]>(url);
    }

    GetPipelinesByGroup(idGroup:number): Observable<GroupMenuDTO[]> {
        var url = this.apiUrlGetPipelineByGroup + '?idGroup=' + idGroup;
        return this.http.get<GroupMenuDTO[]>(url);
    }

    AddAccessGroup(accessgroup: AccessGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddGroup,accessgroup);
    }

    AddGroupMenu(groupMenuDTO: GroupMenuDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddGroupMenu,groupMenuDTO);
    }

    AddGroupPipeline(idGroup:number,idCategory:number): Observable<boolean> {
        var groupPipeline = {idGroup:idGroup,idCategory:idCategory};
        return this.http.post<boolean>(this.apiUrlAddGroupPipeline,groupPipeline);
    }

    InactivateGroupMenu(groupMenuDTO: GroupMenuDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateGroupMenu,groupMenuDTO);
    }

    InactivateGroupPipeline(groupMenuDTO: GroupMenuDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateGroupPipeline,groupMenuDTO);
    }

    UpdateAccessGroup(accessgroup: AccessGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateGroup,accessgroup);
    }

    InactivateAccessGroup(accessgroup: AccessGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateGroup,accessgroup);
    }

    GetByIdUser(idUser:number): Observable<UserGroupDTO[]> {
        var url = this.apiUrlGetUserGroup + '?idUser=' + idUser;
        return this.http.get<UserGroupDTO[]>(url);
    }

    GetByUserName(userName:string): Observable<UserGroupDTO[]> {
        var url = this.apiUrlGetUserGroupByName + '?userName=' + userName;
        return this.http.get<UserGroupDTO[]>(url);
    }

    AddUserGroup(userGroup: UserGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddUserGroup,userGroup);
    }

    InactivateUserGroup(userGroup: UserGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateUserGroup,userGroup);
    }

}