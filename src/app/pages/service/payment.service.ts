import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { PaymentDTO } from '../../dto/paymentdto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class PaymentService {
    private apiUrlGetAll = ApiUrl + '/payment/all';
    private apiUrlAdd = ApiUrl + '/payment/add';
    private apiUrlInactive = ApiUrl + '/payment/inactivate';
    private apiUrlUpdate = ApiUrl + '/payment/update';

    constructor(private http: HttpClient) {}
  
    Get(dateFilter:Date): Observable<PaymentDTO[]> {
        return this.http.post<PaymentDTO[]>(this.apiUrlGetAll,dateFilter);
    }

    Add(payment:PaymentDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAdd,payment);
    }

    Update(payment:PaymentDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdate,payment);
    }

    Inactive(payment:PaymentDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactive,payment);
    }

}