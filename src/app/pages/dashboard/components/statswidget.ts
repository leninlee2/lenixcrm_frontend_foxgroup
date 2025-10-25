import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../service/dashboard.service';
import { DashboardDTO } from '../../../dto/dashboarddto';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3 dash-pipeline">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pipelines</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.pipelineCount}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-6 lg:col-span-3 xl:col-span-3 dash-opportunity">
            <table class="table-data-dash" >
              <tr>
                <td>
                    <div class="card mb-0">
                        <div class="flex justify-between mb-2">
                            <div>
                                <span class="block text-muted-color font-medium mb-4">Attendance</span>
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.valueOpportunity | currency:'USD':'symbol':'1.2-2' }}</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                            </div>
                        </div>
                        <span class="text-primary font-medium">%{{dashboard.grown}}+ </span>
                        <span class="text-muted-color">since last week</span>
                    </div>
                </td>
                <td>
                <div class="card mb-0">
                        <div class="flex justify-between mb-2">
                            <div>
                                <span class="block text-muted-color font-medium mb-4">Closed</span>
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.valueClosed | currency:'USD':'symbol':'1.2-2' }}</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                            </div>
                        </div>
                        <span class="text-primary font-medium">%{{dashboard.grownClosed}}+ </span>
                        <span class="text-muted-color">since last week</span>
                    </div>
                </td>
                <td>
                <div class="card mb-0">
                        <div class="flex justify-between mb-2">
                            <div>
                                <span class="block text-muted-color font-medium mb-4">Gave Ups</span>
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.valueGaveup | currency:'USD':'symbol':'1.2-2' }}</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                            </div>
                        </div>
                        <span class="text-primary font-medium">%{{dashboard.grownGaveUp}}+ </span>
                        <span class="text-muted-color">since last week</span>
                    </div>
                </td>
              </tr>
            </table>
            
            
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Customers</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.countCustomers}}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{dashboard.countCustomersPastWeek}} </span>
                <span class="text-muted-color">newly on past week</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Chat</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{dashboard.chatCount}} In Total</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">- </span>
                <span class="text-muted-color">responded</span>
            </div>
        </div>`
})
export class StatsWidget {

    dashboard!: DashboardDTO;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
  
        this.dashboardService.GetAll().subscribe(
          response => {
            this.dashboard = response;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
   
    }

}
