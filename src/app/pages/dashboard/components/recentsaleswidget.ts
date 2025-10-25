import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { DashboardService } from '../../service/dashboard.service';
import { SalesPipelineDTO } from '../../../dto/salespipelinedto';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Recent Sales</div>
        <p-table [value]="lastSales" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                    <th>View</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 35%; min-width: 7rem;">{{ product.name }}</td>
                    <td style="width: 35%; min-width: 8rem;">{{ product.value | currency: 'USD' }}</td>
                    <td style="width: 15%;">
                        <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only" (click)="getRedirect()" ></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget {
    products!: Product[];
    lastSales:SalesPipelineDTO[] = [];

    getRecentSales(){
        this.dashboardService.GetlastSales().subscribe(
            response => {
              this.lastSales = response;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    getRedirect(){
        window.location.href='/uikit/pipeline';
    }

    constructor(private productService: ProductService, private dashboardService: DashboardService) {}

    ngOnInit() {
        this.getRecentSales();
    }
}
