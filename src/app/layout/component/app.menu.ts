import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
import { CookieService } from 'ngx-cookie-service';
import { CustomMenuItem } from '../../dto/custommenuitem';
import { AuthenticationService } from '../../pages/service/authentication.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: CustomMenuItem[] = [];
    baseModel: CustomMenuItem[] = [];
    cookie: CookieService;
    allowedMenus:string[] = [];

    constructor(
            private cookieService: CookieService,
            private userService: AuthenticationService
        ) {
            this.cookie = cookieService;
    }

    getAllMenus(){
      let email = this.cookie.get('email');
      this.userService.GetAllowedMenus(email).subscribe(
        response => {
          this.allowedMenus = response;
          console.log(this.allowedMenus);
          console.log(this.model);
           this.model = this.baseModel.filter(item =>
             item.label != null &&  this.allowedMenus.indexOf(item.label) >= 0
           );

          //this.model = this.baseModel.filter(item =>
          //  item.menu == null || this.allowedMenus.indexOf(item.menu) > 0
          //);
          console.log(this.model);
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    ngOnInit() {

        let tokendata = this.cookie.get('token');
        let isAdmin = tokendata.substring(tokendata.length -4,tokendata.length) == '-178';
        console.log(tokendata);
        console.log('isAdmin:' + isAdmin);

        this.baseModel = [
            {
                label: 'Home',
                admin:false,
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/uikit/dashboard'] , admin:false, menu:'Dashboard'  }]
            },
            {
                label:'Financial',
                admin:true,
                items: [
                    { label: 'Sales Commission', icon: 'pi pi-fw pi-address-book', routerLink: ['/uikit/salecommission'], admin:true , menu:'SalesComission' },
                    { label: 'Sales Triage', icon: 'pi pi-fw pi-address-book', routerLink: ['/uikit/saletriage'], admin:true , menu:'SalesTriage' },
                    { label: 'General Sales', icon: 'pi pi-fw pi-dollar', routerLink: ['/uikit/generalsales'] , admin:false, menu:'GeneralSales' },
                    { label: 'General Tasks', icon: 'pi pi-fw pi-dollar', routerLink: ['/uikit/generaltask'] , admin:false, menu:'GeneralTasks' }
                ]
            },
            {
                label: 'Activities',
                admin:false,
                items: [
                    { label: 'Chat', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/chatwoot'], admin:false, menu:'Chat' },
                    { label: 'Pipeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/pipeline'] , admin:false, menu:'Pipeline' },
                    { label: 'Schedule', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/schedule'] , admin:false, menu:'Schedule' }, 
                    { label: 'Schedule Management', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/schedulecontrol'] , admin:false, menu:'ScheduleControl' },             
                    { label: 'Product/Service', icon: 'pi pi-fw pi-address-book', routerLink: ['/uikit/productservice'] , admin:false, menu:'ProductService' }, 
                    { label: 'Invoices', icon: 'pi pi-fw pi-money-bill', routerLink: ['/uikit/invoice'] , admin:false, menu:'Invoices' },
                    { label: 'Hearth', icon: 'pi pi-fw pi-money-bill', routerLink: ['/uikit/hearth'], admin:false, menu:'Hearth' },
                ]
            },
            {
                label:'System',
                admin:true,
                items: [
                    { label: 'Users/Salesman', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/user'] , admin:true, menu:'Users' },
                    { label: 'Automation', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/automation'] , admin:true, menu:'Automation' },
                    { label: 'Contacts', icon: 'pi pi-fw pi-address-book', routerLink: ['/uikit/contact'] , admin:false, menu:'Contacts' }
                ]
            },
            {
                label:'Logout',
                admin:false,
                items: [
                    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/uikit/logout'] , admin:false, menu:'Logout' }
                    
                ]
            }    
        ];

        //if(isAdmin){
        //    this.model = this.baseModel;
        //}else{
        //    this.model = this.baseModel.filter(item =>
        //        item.admin == false
        //    );
        //}
        this.getAllMenus();
    }

    /*
                
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },      
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                    */
            /*
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            */
            /*
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
            */
}
