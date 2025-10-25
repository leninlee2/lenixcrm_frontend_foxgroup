import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DashboardService } from '../../service/dashboard.service';
import { SalesPipelineDTO } from '../../../dto/salespipelinedto';

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule],
    template: ` <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Best Selling Products</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>
        <ul class="list-none p-0 m-0">
            <li *ngFor="let item of bestProducts; let i = index" class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{item.name}}</span>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-orange-500 h-full" style="width: {{item.value}}%"></div>
                    </div>
                    <span class="text-orange-500 ml-4 font-medium">%{{item.value}}</span>
                </div>
            </li>
        </ul>
    </div>`
})
export class BestSellingWidget {
    menu = null;

    items = [
        /*
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
         */
    ];

    bestProducts:SalesPipelineDTO[] = [];
    
        getRecentSales(){
            this.dashboardService.GetBestProd().subscribe(
                response => {
                  this.bestProducts = response;
                },
                error => {
                  console.error('Error:', error);  // Handle the error here
                }
              );
        }
    
        getRedirect(){
            window.location.href='/uikit/pipeline';
        }
    
        constructor(private dashboardService: DashboardService) {}
    
        ngOnInit() {
            this.getRecentSales();
        }
}
