import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { SalesIncomeDTO } from '../../dto/salesincomedto';
import { SalesmanDTO } from '../../dto/salesmandto';
import { SalesCommisionGeneralDTO } from '../../dto/salescommisiongeneraldto';
import { SalesCommissionTriageDTO } from '../../dto/salescommissiontriagedto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class SalesService {
    // Sales Commission
    private apiUrlGetSalesIncome = ApiUrl + '/salesincome/all';
    private apiUrlGetManagerIncome = ApiUrl + '/salesmanagerincome/all';
    private apiUrlAddSalesIncome = ApiUrl + '/salesincome/add';
    private apiUrlAddManagerIncome = ApiUrl + '/salesmanagerincome/add';
    private apiUrlUpdateSalesValue = ApiUrl + '/salesincome/updatevalue';
    private apiUrlUpdateManagerValue = ApiUrl + '/salesmanagerincome/updatevalue';
    private apiUrlUpdateSalesOrder = ApiUrl + '/salesincome/updateorder';
    private apiUrlUpdateSalesManagerOrder = ApiUrl + '/salesmanagerincome/updateorder';
    private apiUrlInactivateSalesIncome = ApiUrl + '/salesincome/inactivate';
    private apiUrlInactivateSalesManagerIncome = ApiUrl + '/salesmanagerincome/inactivate';

    private apiUrlGetSalesman = ApiUrl + '/salesman/all';
    private apiUrlGetSalesmanOrCustomer = ApiUrl + '/salesman/salesmanorcustomer';

    private apiUrlAddSalesCommsionGeneral = ApiUrl + '/salescommissiongeneral/add';
    private apiUrlUpdateSalesCommsionGeneral = ApiUrl + '/salescommissiongeneral/update';
    private apiUrlInactiveSalesCommsionGeneral = ApiUrl + '/salescommissiongeneral/inactive';
    private apiUrlGetSalesCommsionGeneral = ApiUrl + '/salescommissiongeneral/get';

    // Triage
    private apiUrlGetSalesTriage = ApiUrl + '/salescommissiontriage/get';
    private apiUrlAddSalesTriage = ApiUrl + '/salescommissiontriage/add';
    private apiUrlUpdateSalesTriage = ApiUrl + '/salescommissiontriage/update';
    private apiUrlInactiveSalesTriage = ApiUrl + '/salescommissiontriage/inactive';

    constructor(private http: HttpClient) {}

    
    GetSalesIncomes(): Observable<SalesIncomeDTO[]> {
        return this.http.get<SalesIncomeDTO[]>(this.apiUrlGetSalesIncome);
    }

    GetManagerIncomes(): Observable<SalesIncomeDTO[]> {
        return this.http.get<SalesIncomeDTO[]>(this.apiUrlGetManagerIncome);
    }

    GetSalesman(): Observable<SalesmanDTO[]> {
        return this.http.get<SalesmanDTO[]>(this.apiUrlGetSalesman);
    }

    GetSalesmanOrCustomer(email:string): Observable<SalesmanDTO[]> {
        var url = this.apiUrlGetSalesmanOrCustomer + '?email=' + email;
        return this.http.get<SalesmanDTO[]>(url);
    }

    GetSaleComissionGeneral(date:Date): Observable<SalesCommisionGeneralDTO[]> {
        return this.http.post<SalesCommisionGeneralDTO[]>(this.apiUrlGetSalesCommsionGeneral,date);
    }

    GetSaleTriage(date:Date): Observable<SalesCommissionTriageDTO[]> {
        return this.http.post<SalesCommissionTriageDTO[]>(this.apiUrlGetSalesTriage,date);
    }

    AddSalesIncome(salesIncomem: SalesIncomeDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddSalesIncome,salesIncomem);
    }

    AddSalesTriage(salesCommissionTriage: SalesCommissionTriageDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddSalesTriage,salesCommissionTriage);
    }

    AddManagerIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlAddManagerIncome,salesIncomem);
    }

    AddSalesGeneral(salesCommisionGeneral: SalesCommisionGeneralDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddSalesCommsionGeneral,salesCommisionGeneral);
    }

    UpdateSalesGeneral(salesCommisionGeneral: SalesCommisionGeneralDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateSalesCommsionGeneral,salesCommisionGeneral);
    }

    UpdateSalesTriage(salesCommissionTriage: SalesCommissionTriageDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateSalesTriage,salesCommissionTriage);
    }

    InactiveSalesGeneral(salesCommisionGeneral: SalesCommisionGeneralDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactiveSalesCommsionGeneral,salesCommisionGeneral);
    }

    UpdateValueIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlUpdateSalesValue,salesIncomem);
    }

    UpdateValueManagerIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlUpdateManagerValue,salesIncomem);
    }

    UpdateOrderIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlUpdateSalesOrder,salesIncomem);
    }

    UpdateOrderManagerIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlUpdateSalesManagerOrder,salesIncomem);
    }

    InactivateSalesIncome(salesIncomem: SalesIncomeDTO): Observable<SalesIncomeDTO> {
        return this.http.post<SalesIncomeDTO>(this.apiUrlInactivateSalesIncome,salesIncomem);
    }

    InactivateSalesManagerIncome(salesIncomem: SalesIncomeDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateSalesManagerIncome,salesIncomem);
    }

    InactivateSalesTriage(salesCommissionTriage: SalesCommissionTriageDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactiveSalesTriage,salesCommissionTriage);
    }

}