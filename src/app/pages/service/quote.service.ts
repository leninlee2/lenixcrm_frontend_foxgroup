import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { QuoteDTO } from '../../dto/quotedto';
import { QuoteItemDTO } from '../../dto/quoteitemdto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class QuoteService {
    private apiUrlGetAll = ApiUrl + '/quote/all';
    private apiUrlGetByOpportunity = ApiUrl + '/quote/getbyopportunity';
    private apiUrlAddItem = ApiUrl + '/quote/additem';
    private apiUrlAdd = ApiUrl + '/quote/add';
    private apiUrlUpdate = ApiUrl + '/quote/update';
    private apiUrlUpdateItem = ApiUrl + '/quote/updateitem';
    private apiUrlInactive = ApiUrl + '/quote/inactivate';
    private apiUrlInactiveItem = ApiUrl + '/quote/inactivateitem';

    constructor(private http: HttpClient) {}
  
    GetAll(): Observable<QuoteDTO[]> {
        return this.http.get<QuoteDTO[]>(this.apiUrlGetAll);
    }

    GetByOpportunity(idOpportunity:number): Observable<QuoteDTO> {
        var url = this.apiUrlGetByOpportunity + '?idOpportunity=' + idOpportunity;
        return this.http.get<QuoteDTO>(url);
    }

    AddItem(quote:QuoteDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddItem,quote);
    }

    Add(quote:QuoteDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAdd,quote);
    }

    Update(quote:QuoteDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdate,quote);
    }

    UpdateItem(quote:QuoteItemDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateItem,quote);
    }

    Inactive(quote:QuoteDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactive,quote);
    }

    InactiveItem(quote:QuoteItemDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactiveItem,quote);
    }

}