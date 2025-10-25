import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { GeneralSaleWidget } from './components/generalsaleswidget';
import { GeneralTopSalesmanWidget } from './components/generaltopsalesmanwidget';
import { PipelineTopSalesmanWidget } from './components/pipelinetopsalesmanwidget';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget
        , NotificationsWidget,GeneralSaleWidget,GeneralTopSalesmanWidget,PipelineTopSalesmanWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-general-topsalesman-widget/>
                <app-pipeline-topsalesman/>
                <app-recent-sales-widget />
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />
                <app-general-sale-widget />
                <app-notifications-widget />
            </div>
        </div>
    `
})
export class Dashboard implements OnInit {

    constructor(private router: Router) {}

     ngOnInit() {
        if (this.isMobileDevice()) {
        this.router.navigate(['/uikit/mobilehome']); // or whatever mobile-specific route
        }
    }

    isMobileDevice(): boolean {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

}
