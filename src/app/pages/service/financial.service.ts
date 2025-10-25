import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { FinancialControlDTO } from '../../dto/financialcontroldto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class FinancialService {
    private apiUrlGetFinancial = ApiUrl + '/financialcontrol/get';
    private apiUrlAdd = ApiUrl + '/financialcontrol/add';
    private apiUrlInactive = ApiUrl + '/financialcontrol/inactive';
    private apiUrlUpdate = ApiUrl + '/financialcontrol/update';

    constructor(private http: HttpClient) {}
  
    Get(idOpportunity:number): Observable<FinancialControlDTO[]> {
        var url = this.apiUrlGetFinancial + '?idOpportunity=' + idOpportunity;
        return this.http.get<FinancialControlDTO[]>(url);
    }

    Add(financialControl:FinancialControlDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAdd,financialControl);
    }

    Update(financialControl:FinancialControlDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdate,financialControl);
    }

    Inactive(financialControl:FinancialControlDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactive,financialControl);
    }

}