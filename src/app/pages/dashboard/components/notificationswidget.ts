import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { IntegrationService } from '../../service/integration.service';
import { FromSourceDTO } from '../../../dto/fromsourcedto';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule,CommonModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Notifications</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">LAST NOTIFICATIONS</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let item of fromSource; let i = index" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-send !text-xl text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Richard Jones
                    <span class="text-surface-700 dark:text-surface-100">has purchased a blue t-shirt for <span class="text-primary font-bold">$79.00</span></span>
                </span>
            </li>
            <!--
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-download !text-xl text-orange-500"></i>
                </div>
                <span class="text-surface-700 dark:text-surface-100 leading-normal">Your request for withdrawal of <span class="text-primary font-bold">$2500.00</span> has been initiated.</span>
            </li>
            -->
        </ul>
        <!--
        <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-6">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-dollar !text-xl text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Keyser Wick
                    <span class="text-surface-700 dark:text-surface-100">has purchased a black jacket for <span class="text-primary font-bold">$59.00</span></span>
                </span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-question !text-xl text-pink-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Jane Davis
                    <span class="text-surface-700 dark:text-surface-100">has posted a new questions about your product.</span>
                </span>
            </li>
        </ul>
        -->
        <!--
        <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-arrow-up !text-xl text-green-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">Your revenue has increased by <span class="text-primary font-bold">%25</span>.</span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-heart !text-xl text-purple-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"><span class="text-primary font-bold">12</span> users have added your products to their wishlist.</span>
            </li>
        </ul>
        -->
    </div>`
})
export class NotificationsWidget {
    items = [
        /*
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
         */
    ];

    fromSource:FromSourceDTO[] = [];
        
            getLastFromChat(){
                this.integrationService.GetFromChat(false,false,1,-1).subscribe(
                    response => {
                      this.fromSource = response;
                    },
                    error => {
                      console.error('Error:', error);  // Handle the error here
                    }
                  );
            }

            ngOnInit() {
                this.getLastFromChat();
            }

    constructor(private integrationService: IntegrationService) {}
}
