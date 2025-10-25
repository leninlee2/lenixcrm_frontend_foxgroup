import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SelectModule } from 'primeng/select';
import { TSPlus, ChatGuacamole } from '../../service/constants';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, Router } from '@angular/router';

export class ChatWoot2Component implements RouteReuseStrategy {

    //cookie: CookieService;
    urlChat:string = ChatGuacamole;
    urlFinalChat:string = '';
    iframeUrl: SafeResourceUrl | null = null;
    private storedHandles = new Map<string, DetachedRouteHandle>();
    private storedHandle: DetachedRouteHandle | null = null;

    constructor() {
        console.log('[ReuseStrategy] ChatWoot2Component strategy initialized');
    }

    //constructor(private cookieService: CookieService,private sanitizer: DomSanitizer) {
      //this.cookie = cookieService;
      //this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(TSPlus);
      //console.log('load iframe');
    //}

  //ngOnInit(): void {
//
  //  // You must sanitize here before binding
  //  this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(TSPlus);
  //}

  private getFullUrl(route: ActivatedRouteSnapshot): string {
    return '/' + route.pathFromRoot
        .map(snapshot =>
        snapshot.url.map(segment => segment.toString()).join('/')
        )
        .filter(part => part.length > 0)
        .join('/');
   }

  // Define which routes should be reused
  private reusableRoutes = ['chatwoot'];

   private isReusable(route: ActivatedRouteSnapshot): boolean {
    // Walk up the route tree and check if any matched path is in your list
     return route.pathFromRoot.some(r => {
         const path = r.routeConfig?.path || '';
        return this.reusableRoutes.includes(path);
     });
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const should = this.isReusable(route);
    console.log('shouldDetach:', should, this.getFullUrl(route));
    console.log('shouldDetach - result:', should);
    return should;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = this.getFullUrl(route);
    console.log('store - result:', path);
    this.storedHandles.set(path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    //const should = this.isReusable(route);
    //console.log('shouldAttach:', should, this.getFullUrl(route));
    //console.log('shouldAttach - result:', should);
    //return should && this.storedHandle !== null;
    const path = this.getFullUrl(route);
    const exists = this.storedHandles.has(path);
    const should = this.isReusable(route);
    console.log('shouldAttach:', should && exists, path);
    return should && exists;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    //const path = this.getFullUrl(route);
    //console.log('retrieve - result:', path);
    //return this.storedHandles.get(path) || null;
    const path = this.getFullUrl(route);
    const handle = this.storedHandles.get(path) || null;
    console.log('retrieve - result:', path, handle ? '✔️ restored' : '❌ not found');
    return handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    //const reuse = future.routeConfig === curr.routeConfig;
    //console.log('shouldReuseRoute - result:', future.routeConfig,curr.routeConfig);
    //console.log('[Reuse] shouldReuseRoute:', curr.routeConfig?.path, '=>', reuse);
    //return reuse;
    /*
    const futureUrl = this.getFullUrl(future);
    const isInCache = this.storedHandles.has(futureUrl);

    // This allows reusing the route even when curr != future
    const shouldReuse = isInCache || future.routeConfig === curr.routeConfig;

    console.log('[Reuse] shouldReuseRoute:', futureUrl, '=>', shouldReuse);
    return shouldReuse;
    */
    return false;
   }

    
}
