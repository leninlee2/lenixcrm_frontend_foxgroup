import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomerDTO } from '../../../dto/customerdto';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinancialService } from '../../service/financial.service';
import { FinancialControlDTO } from '../../../dto/financialcontroldto';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from '../../service/product.service';
import { ProductServiceDTO } from '../../../dto/productservicedto';
import { QuoteItemDTO } from '../../../dto/quoteitemdto';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { QuoteService } from '../../service/quote.service';
import { QuoteDTO } from '../../../dto/quotedto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-quote',
    standalone: true,
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule,DragDropModule,
      CardModule,TabsModule,SelectModule,TableModule,CheckboxModule,DialogModule,ToggleSwitchModule,TextareaModule
      ,AutoCompleteModule],
    templateUrl: './quote.component.html',
    styleUrl: './quote.component.css',
    providers: [MessageService]
})
export class QuoteComponent  implements OnInit {
    id: string | null = null;
    idOpportunity:number = 0;
    selectedPipeline:any;
    customers:CustomerDTO[] = [];
    openContact:boolean = false;
    customer:CustomerDTO = new CustomerDTO(0,'','','','',new Date(),'',new Date());
    financialControls:FinancialControlDTO[] = [];
    financialControl:FinancialControlDTO = new FinancialControlDTO(0,0,'',false,0,0,'',0,new Date(),true);
    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();
    finalValue:number = 0;
    productServices:ProductServiceDTO[] = [];
    filteredProductServices:ProductServiceDTO[] = [];
    productName:string = '';
    quoteItem:QuoteItemDTO = new QuoteItemDTO(0,0,0,0,0,new Date(),true,'','',0);
    productItem: ProductServiceDTO = new ProductServiceDTO(0,'',0,new Date(),true,0);
    quote:QuoteDTO = new QuoteDTO(0,0,0,'','','','','',0,new Date(),true);
    @ViewChild('unityPrice') unityPrice!: ElementRef;
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  data = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 25, city: 'London' },
    { name: 'Charlie', age: 35, city: 'Paris' }
  ];

  emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'','' );
    }


  generatePDF() {
    const content = this.pdfContent.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('generated.pdf');
    });
  }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.idOpportunity = Number(this.id);
      this.quote.idOpportunity = this.idOpportunity;
      console.log('ID:', this.id);
      this.getAllProducts();
      this.getQuote();
    }

    filterProduct(event: any) {
        this.quoteItem.amount = 1;
        const query = event.query.toLowerCase();
        this.filteredProductServices = this.productServices.filter(item =>
          item.name.toLowerCase().includes(query)
        );
        this.productName = query;

        if(this.productItem.id > 0){
          this.quoteItem.unityPrice = this.productItem.unityPrice;
        //  var item = this.filteredProductServices[0];
        //  this.quoteItem.unityPrice = this.productItem.unityPrice;
        //  this.quoteItem.idProduct = this.productItem.id;
        //  this.quoteItem.productName = this.productItem.name;
        }        
    }

    resetControl(){
      this.quoteItem = new QuoteItemDTO(0,0,0,0,0,new Date(),true,'','',0);
      this.productItem = new ProductServiceDTO(0,'',0,new Date(),true,0);
    }

    openNewContact(){
      this.customer = new CustomerDTO(0,'','','','',new Date(),'',new Date());
      this.openContact = true;
    }

    AddQuoteItem(){
      this.quote.idOpportunity = this.idOpportunity;
      if(this.productItem.id == undefined || this.productItem.id == 0)
          this.quoteItem.productName = this.productName;
        else {
          this.quoteItem.idProduct = this.productItem.id;
          this.quoteItem.productName = this.productItem.name;
      }

      var unityPrice = this.unityPrice.nativeElement.value;

      this.quoteItem.unityPrice = unityPrice;
      this.quote.quoteItems = [];
      this.quote.quoteItems.push(this.quoteItem);

      if(this.quoteItem.id ==0){
      
        //console.log(this.quote);
        //return;
        this.quoteService.AddItem(this.quote).subscribe(
          response => {
            this.getAllProducts();
            this.resetControl();
            this.getQuote();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }else{
        this.quoteService.UpdateItem(this.quoteItem).subscribe(
          response => {
            this.getAllProducts();
            this.resetControl();
            this.getQuote();
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }  
    }

    Inactive(item: QuoteItemDTO){
      this.quoteService.InactiveItem(item).subscribe(
        response => {
          this.getQuote();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    fillEdit(item: QuoteItemDTO){
      this.quoteItem = item;
      this.fillProduct();
    }

    fillProduct(){
      for(var i = 0;i < this.productServices.length;i++){
        if(this.productServices[i].id == this.quoteItem.idProduct){
          this.productItem = this.productServices[i];
          this.productItem.unityPrice = this.quoteItem.unityPrice;
          i = this.productServices.length;
        }
      }
    }

    rowClick(item: QuoteItemDTO, event:any){
      var target = event.target as HTMLElement;
      while (target && target.tagName !== 'TD') {
        target = target.parentElement!;
      }

      const td = target as HTMLTableCellElement;
      console.log(item);
      console.log('clicked row');
      console.log(td.cellIndex);

      //5 = edit column:
      if(td.cellIndex == 5){
        this.fillEdit(item);
      }

      //6 = delete column:
      if(td.cellIndex == 6){
        this.Inactive(item);
      }
      event.stopPropagation();
    }

    getButtonLabel(){
      return this.financialControl.id > 0? "Edit": "Save";
    }

    redirectOpportunity(){
      window.location.href='/uikit/pipeline';
    }

    getAllProducts(){
        this.productService.GetProductServices().subscribe(
          response => {
            this.productServices = response;
            console.log(this.productServices);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    getQuote(){
      this.quoteService.GetByOpportunity(this.idOpportunity).subscribe(
          response => {
            this.quote = response;
            console.log(this.quote);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }
   
    constructor(private service: MessageService,private route: ActivatedRoute
      , private financialService:FinancialService, private pipelineService: PipelineService
      ,private productService:ProductService, private quoteService:QuoteService) {}

    
}
