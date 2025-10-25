import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { DashboardDTO } from '../../dto/dashboarddto';
import { SalesPipelineDTO } from '../../dto/salespipelinedto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class DashboardService {
    private apiUrlDashboard = ApiUrl + '/dashboard/all';
    private apiUrlSalesPipeline = ApiUrl + '/dashboard/salespipeline';
    private apiUrlGeneralSales = ApiUrl + '/dashboard/generalsales';
    private apiUrlGeneralSalesTopSalesman = ApiUrl + '/dashboard/generalsalestopsalesman';
    private apiUrlPipelineTopSalesman = ApiUrl + '/dashboard/pipelinetopsalesman';
    private apiUrlLastSales = ApiUrl + '/dashboard/lastsales';
    private apiUrlBestProd = ApiUrl + '/dashboard/bestpipelineprod';

    constructor(private http: HttpClient) {}
  
    GetAll(): Observable<DashboardDTO> {
        return this.http.get<DashboardDTO>(this.apiUrlDashboard);
    }

    GetSalesPipelines(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlSalesPipeline);
    }

    GetGeneralSales(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlGeneralSales);
    }

    GetGeneralTopSalesman(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlGeneralSalesTopSalesman);
    }

    GetPipelineSalesman(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlPipelineTopSalesman);
    }

    GetlastSales(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlLastSales);
    }

    GetBestProd(): Observable<SalesPipelineDTO[]> {
        return this.http.get<SalesPipelineDTO[]>(this.apiUrlBestProd);
    }

}
