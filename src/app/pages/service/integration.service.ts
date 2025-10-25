import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { FromSourceDTO } from '../../dto/fromsourcedto';
import { ChatWhatpsAppDTO } from '../../dto/chatwhatpsappdto';
import { ChatDTO } from '../../dto/chatdto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class IntegrationService {
    private apiUrlGetFrom = ApiUrl + '/integration/getallfrom';
    private apiUrlGetWhatsApp = ApiUrl + '/integration/getwhatsapp';
    private apiUrlAddWhats = ApiUrl + '/integration/addwhats';
    private apiUrlAddMessage = ApiUrl + '/integration/addmessage';
    private apiUrlAllChat = ApiUrl + '/integration/getallmessages';
    private apiUrlLastFrom = ApiUrl + '/integration/lastfrom';
    private apiUrlNewLastFrom = ApiUrl + '/integration/newlastfrom';

    constructor(private http: HttpClient) {}

    
    GetFromChat(unreaded:boolean,recent:boolean,pageNumber:number,sourceMessage:number): Observable<FromSourceDTO[]> {
        var url = this.apiUrlGetFrom + '?unreaded=' + unreaded 
        + '&recent=' + recent + '&pageNumber=' + pageNumber + '&sourceMessage=' + sourceMessage;
        return this.http.get<FromSourceDTO[]>(url);
    }

    GetWhatsChat(from:string): Observable<ChatWhatpsAppDTO[]> {
        var url = this.apiUrlGetWhatsApp + '?from_filter=' + from;
        return this.http.get<ChatWhatpsAppDTO[]>(url);
    }

    GetAllChat(from:string,source:number): Observable<ChatDTO[]> {
        var url = this.apiUrlAllChat + '?from_filter=' + from + '&source=' + source;
        return this.http.get<ChatDTO[]>(url);
    }

    AddWhats(chat: ChatWhatpsAppDTO): Observable<ChatWhatpsAppDTO> {
        var url = this.apiUrlAddWhats;
        return this.http.post<ChatWhatpsAppDTO>(url,chat);
    }

    AddMessage(chat: FromSourceDTO): Observable<FromSourceDTO> {
        var url = this.apiUrlAddMessage;
        return this.http.post<FromSourceDTO>(url,chat);
    }

    GetLastMessageFrom(lastFromSource:FromSourceDTO): Observable<FromSourceDTO[]> {
        return this.http.post<FromSourceDTO[]>(this.apiUrlLastFrom,lastFromSource);
    }

    GetNewLastMessageFrom(lastFromSource:FromSourceDTO[],sourceMessage:number): Observable<FromSourceDTO[]> {
        var url = this.apiUrlNewLastFrom + '?sourceMessage=' + sourceMessage;
        return this.http.post<FromSourceDTO[]>(url,lastFromSource);
    }

}