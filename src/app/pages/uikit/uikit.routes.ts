import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FileDemo } from './filedemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { MessagesDemo } from './messagesdemo';
import { MiscDemo } from './miscdemo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { OverlayDemo } from './overlaydemo';
import { TreeDemo } from './treedemo';
import { MenuDemo } from './menudemo';
import { ChatComponent } from './chat/chat.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { ContactComponent } from './contact/contact.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { Dashboard } from '../dashboard/dashboard';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FinanceControlComponent } from './financecontrol/financecontrol.component';
import { SaleCommisionControlComponent } from './salecommission/salecommission.component';
import { SaleTriageControlComponent } from './saletriage/saletriage.component';
import { ProductServiceComponent } from './productservice/productservice.component';
import { GeneralSalesComponent } from './generalsales/generalsales.component';
import { GeneralTaskComponent } from './generaltask/generaltask.component';
import { ChatWebViewComponent } from './chatwebview/chatwebview.component';
import { HearthComponent } from './hearth/hearh.component';
import { QuoteComponent } from './quote/quote.component';
import { DimageComponent } from './dimage/dimage.component';
import { ChatWootComponent } from './chatwoot/chatwoot.component';
import { AutomationComponent } from './automation/automation.component';
import { PaymentComponent } from './payment/payment.component';
import { MobileHomeComponent } from './mobile-home/mobilehome.component';
import { NewOpMobileComponent } from './mobile-newopportunity/newopmobile.component';
import { SearchMobileComponent } from './mobile-search/searchmobile.component';
import { EdOpportunityComponent } from './mobile-edopportunity/edopportunity.component';
import { ScheduleControlComponent } from './schedulecontrol/schedulecontrol.component';

export default [
    { path: 'chat', data: { breadcrumb: 'Chat' }, component: ChatComponent },
    { path: 'chatwoot', data: { breadcrumb: 'Chatwoot' }, component: ChatWootComponent },
    { path: 'pipeline', data: { breadcrumb: 'Pipeline' }, component: PipelineComponent },
    { path: 'contact', data: { breadcrumb: 'Contact' }, component: ContactComponent },
    { path: 'invoice', data: { breadcrumb: 'Invoice' }, component: InvoiceComponent },
    { path: 'dashboard', data: { breadcrumb: 'Dashboard' }, component: Dashboard },
    { path: 'logout', data: { breadcrumb: 'Logout' }, component: LogoutComponent },
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDemo },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDemo },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDemo },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayDemo },
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDemo },
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuDemo },
    { path: 'user', data: { breadcrumb: 'User' }, component: UserComponent },
    { path: 'schedule', data: { breadcrumb: 'schedule' }, component: ScheduleComponent },
    { path: 'financecontrol/:id', data: { breadcrumb: 'financecontrol' }, component: FinanceControlComponent },
    { path: 'salecommission', data: { breadcrumb: 'salecommission' }, component: SaleCommisionControlComponent },
    { path: 'saletriage', data: { breadcrumb: 'saletriage' }, component: SaleTriageControlComponent },
    { path: 'productservice', data: { breadcrumb: 'productservice' }, component: ProductServiceComponent },
    { path: 'generalsales', data: { breadcrumb: 'generalsales' }, component: GeneralSalesComponent },
    { path: 'generaltask', data: { breadcrumb: 'generaltask' }, component: GeneralTaskComponent },
    { path: 'chatwebview', data: { breadcrumb: 'chatwebview' }, component: ChatWebViewComponent },
    { path: 'hearth', data: { breadcrumb: 'hearth' }, component: HearthComponent },
    { path: 'quote/:id', data: { breadcrumb: 'hearth' }, component: QuoteComponent },
    { path: 'dimage', data: { breadcrumb: 'dimage' }, component: DimageComponent },
    { path: 'automation', data: { breadcrumb: 'automation' }, component: AutomationComponent },
    { path: 'mobilehome', data: { breadcrumb: 'mobilehome' }, component: MobileHomeComponent },
    { path: 'newopmobile', data: { breadcrumb: 'newopmobile' }, component: NewOpMobileComponent },
    { path: 'searchmobile', data: { breadcrumb: 'searchmobile' }, component: SearchMobileComponent },
    { path: 'edopmobile/:id', data: { breadcrumb: 'edopmobile' }, component: EdOpportunityComponent },
    { path: 'payment/:id', data: { breadcrumb: 'payment' }, component: PaymentComponent },
    { path: 'schedulecontrol', data: { breadcrumb: 'schedulecontrol' }, component: ScheduleControlComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
