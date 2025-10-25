import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';
import { DashboardService } from '../../service/dashboard.service';
import { SalesPipelineDTO } from '../../../dto/salespipelinedto';

@Component({
    standalone: true,
    selector: 'app-general-sale-widget',
    imports: [ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">General Sales</div>
        <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>`
})
export class GeneralSaleWidget {
    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    salesPipelines: SalesPipelineDTO[] = [];

    labels:string[] = [];
    values:number[] = [];

    constructor(public layoutService: LayoutService, private dashboardService: DashboardService) {
        //this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
        //    
        //});
        this.getGeneralSales();
    }

    getGeneralSales(){
        this.dashboardService.GetGeneralSales().subscribe(
            response => {
              this.salesPipelines = response;
              this.fillLabelsAndValues();
              this.initSalesPipelineChart();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    fillLabelsAndValues(){
        for(var i = 0;i < this.salesPipelines.length;i++){
            this.labels.push(this.salesPipelines[i].name);
            this.values.push(this.salesPipelines[i].value);
        }
    }

    initSalesPipelineChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: this.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'General Sales',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: this.values,
                    barThickness: 32
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
