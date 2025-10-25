import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../../dto/logindto';
import { AuthenticationDTO } from '../../dto/authenticationdto';
import { ApiUrl } from './constants';
import { OpportunityFileDTO } from '../../dto/opportunityfiledto';
import { GroupMenuDTO } from '../../dto/groupmenudto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class AuthenticationService {
    private apiUrl = ApiUrl + '/login';  
    private apiUrlGetUser = ApiUrl + '/user/all';  
    private apiUrlAddUser = ApiUrl + '/user/add';  
    private apiUrlUpdateUser = ApiUrl + '/user/update';  
    private apiUrlInactivateUser = ApiUrl + '/user/inactivate';  
    private apiUrlUpload = ApiUrl + '/user/uploadfile';  
    private apiUrlFileById = ApiUrl + '/user/getfilebyid';  
    private apiUrlAllFiles = ApiUrl + '/user/getallfiles';  
    private apiUrlGetMenu = ApiUrl + '/user/getmenu'; 
    private apiUrlGetFormatMenu = ApiUrl + '/user/getformatmenu';  

    constructor(private http: HttpClient) {}

    // POST request method
    GetToken(data: LoginDTO): Observable<AuthenticationDTO> {
        return this.http.post<AuthenticationDTO>(this.apiUrl, data);
    }

    GetAllUsers(): Observable<LoginDTO[]> {
        return this.http.get<LoginDTO[]>(this.apiUrlGetUser);
    }

    Add(loginDTO:LoginDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddUser,loginDTO);
    }

    Update(loginDTO:LoginDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateUser,loginDTO);
    }

    Inactivate(loginDTO:LoginDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateUser,loginDTO);
    }

    UploadFile(formData:FormData): Observable<OpportunityFileDTO>{
        return this.http.post<OpportunityFileDTO>(this.apiUrlUpload, formData);
    }

    GetFileById(id:number): Observable<OpportunityFileDTO> {
        var url = this.apiUrlFileById + '?id=' + id;
        return this.http.get<OpportunityFileDTO>(url);
    }

    GetAllFiles(): Observable<OpportunityFileDTO[]> {
        return this.http.get<OpportunityFileDTO[]>(this.apiUrlAllFiles);
    }

    GetAllowedMenus(user:string): Observable<string[]> {
        var url = this.apiUrlGetMenu + '?user=' + user;
        return this.http.get<string[]>(url);
    }

    GetFormatMenus(user:string): Observable<GroupMenuDTO[]> {
        var url = this.apiUrlGetFormatMenu + '?user=' + user;
        return this.http.get<GroupMenuDTO[]>(url);
    }

}
