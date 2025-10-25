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
    selector: 'app-general-topsalesman-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Seller Rank - General Sale</div>
        <p-table [value]="salesman" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="value">Price <p-sortIcon field="price"></p-sortIcon></th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 35%; min-width: 7rem;">{{ product.name }}</td>
                    <td style="width: 35%; min-width: 8rem;">{{ product.value | currency: 'USD' }}</td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class GeneralTopSalesmanWidget {
    products!: Product[];
    salesman:SalesPipelineDTO[] = [];

    constructor(private productService: ProductService, private dashboardService: DashboardService) {}

    ngOnInit() {
        this.dashboardService.GetGeneralTopSalesman().subscribe(
            response => {
              this.salesman = response;
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }
}
