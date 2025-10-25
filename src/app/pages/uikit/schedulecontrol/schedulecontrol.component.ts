import { Component, inject, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { NodeService } from '../../service/node.service';
import { SalesmanDTO } from '../../../dto/salesmandto';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalesService } from '../../service/sales.service';
import { DatePickerModule } from 'primeng/datepicker';
import { GeneralTaskDTO } from '../../../dto/generaltaskdto';
import { ButtonModule } from 'primeng/button';
import { GeneralTaskItemDTO } from '../../../dto/generaltaskItemdto';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { GeneralTaskTreeDTO, ScheduleAreaDTO, ScheduleControlDTO } from '../../../dto/generaltasktreedto';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { PipelineService } from '../../service/pipeline.service';
import { OpportunityPipelineDTO } from '../../../dto/opportunitypipelinedto';
import { CheckNewSchedule } from '../../../dto/opportunitypipelinedto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-schedule-control',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule
        ,AutoCompleteModule,DatePickerModule,ButtonModule,DialogModule
        ,InputTextModule,CheckboxModule,TabsModule,CardModule, ProgressSpinnerModule],
    templateUrl: './schedulecontrol.component.html',
    styleUrl: './schedulecontrol.component.css',
    providers: [NodeService]
})
export class ScheduleControlComponent implements OnInit {
    treeValue: GeneralTaskTreeDTO[] = [];

    treeTableValue: TreeNode[] = [];

    selectedTreeValue: TreeNode[] = [];

    selectedTreeTableValue = {};

    cols: any[] = [];

    filteredSalesman:SalesmanDTO[] = [];

    salesmans:SalesmanDTO[] = [];

    salesman:SalesmanDTO = new SalesmanDTO(0,'',1);

    //nodeService = inject(NodeService);

    dateFilter: Date = new Date();

    generalTask: GeneralTaskDTO = new GeneralTaskDTO(0,0,'',new Date());

    openSchedule:boolean = false;

    openDoubleCheck:boolean = false;

    generalItemTask:GeneralTaskItemDTO = new GeneralTaskItemDTO(0,0,'',new Date(),0,false,true,false);

    scheduleFilter: ScheduleControlDTO = new ScheduleControlDTO(new Date(), new Date() ,0,'');

    salesName:string = '';

    startFilter:Date = new Date();
    endFilter:Date = new Date();
    currentWeek:number = 0;

    salesmanSelected:GeneralTaskTreeDTO = new GeneralTaskTreeDTO(0,'','','',0,0,true,new Date(),'',true,[],[],0,'', this.emptyArea());

    sundayDate:Date = new Date();
    mondayDate:Date = new Date();
    tusdayDate:Date = new Date();
    wednesdayDate:Date = new Date();
    thursdayDate:Date = new Date();
    fridayDate:Date=new Date();
    saturdayDate:Date = new Date();

    newAppointment:Date = new Date();

    opportunity:OpportunityPipelineDTO = this.emptyOpportunity();

    checkSchedule: CheckNewSchedule = new CheckNewSchedule(false,0,'',new Date(),0);

    area:ScheduleAreaDTO = this.emptyArea();

    openedArea:boolean = false;

    loading:boolean = true;

    areaDetail:string = '';

    freeItem:any;

    ngOnInit() {

        this.getAllSalesman();

        //0 - current week: +1 is like add to next week -1 return to previous week
        this.moveWeek(0);
    }

    openArea(scheduleArea:ScheduleAreaDTO){
      this.area = scheduleArea;
      this.areaDetail = this.area.area;
      this.openedArea = true;
    }

    addArea(){
      this.area.area = this.areaDetail;
      console.log(this.area.area);
      this.pipelineService.AddScheduleArea(this.area).subscribe(
        response => {
          this.area.id = response;
          this.openedArea = false;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    emptyArea(){
      return new ScheduleAreaDTO(0,'',0,'', new Date());
    }

    emptyOpportunity(){
      return new OpportunityPipelineDTO(0,0,0,0,'','','','','','','',0, ''
            ,new Date(),new Date(), '',0,0,0,'', new Date(),'' , '');
    }

    moveWeek(moveNumber:number){
        var startDate = new Date();
        if(moveNumber > 0)
          startDate = new Date(this.endFilter.getFullYear(),this.endFilter.getMonth(),this.endFilter.getDate() + 1);
        else if(moveNumber < 0){
          startDate = this.startFilter;
          startDate.setDate(startDate.getDate()-7);
          console.log('the date:' + startDate);
        }else{
          console.log('Test moveWeek');
          console.log(startDate);
          var dayOfWeek = startDate.getDay();
          while(dayOfWeek != 0){
            startDate.setDate(startDate.getDate()-1);
            dayOfWeek = startDate.getDay();
          }
        }

        var weekRange = this.getCurrentWeekRange(startDate);
        this.startFilter = weekRange.start;
        this.endFilter = weekRange.end;
        console.log('after treat date:' + this.startFilter);
        console.log('after end:' + this.endFilter);

        this.getAllScheduleControl();
    }

    getCurrentWeekRange(startDate:Date): { start: Date; end: Date } {
        var now = startDate;

        // Get current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeek = now.getDay();

        // Calculate the first day (Sunday) of the current week
        //const firstDay = new Date(now);
        //firstDay.setDate(now.getDate() - dayOfWeek);
        const firstDay = now;
        console.log('firstDay:' + firstDay);

        this.sundayDate = startDate;

        console.log('sundayDate:' + this.sundayDate);

        this.mondayDate = new Date(this.sundayDate);
        this.mondayDate.setDate(this.mondayDate.getDate() + 1);

        console.log('mondayDate:' + this.mondayDate);

        this.tusdayDate.setDate(this.mondayDate.getDate() + 1);

        this.wednesdayDate.setDate(this.tusdayDate.getDate() + 1);

        this.thursdayDate.setDate(this.wednesdayDate.getDate() + 1);

        this.fridayDate.setDate(this.thursdayDate.getDate() + 1);

        // Calculate the last day (Saturday) of the current week
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);

        this.saturdayDate = lastDay;

        console.log('after last step:' + startDate);

        return { start: startDate, end: lastDay };
    }

    updateDone(event:any, node:GeneralTaskTreeDTO){
      var taskItem = new GeneralTaskItemDTO(node.id,0,'',new Date(),0,node.done,true,false);
      this.nodeService.UpdateDoneTask(taskItem).subscribe(
        response => {
          //this.getAllTasks();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    inactiveTaskItem(node:GeneralTaskTreeDTO){
      var taskItem = new GeneralTaskItemDTO(node.id,0,'',new Date(),0,node.done,true,false);
      this.nodeService.InactiveTaskItem(taskItem).subscribe(
        response => {
          this.getAllTasks();
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    openNewSchedule(salesman:GeneralTaskTreeDTO,freeItem:any){
        this.salesmanSelected = salesman;
        this.freeItem = freeItem;
        this.setDate(this.salesmanSelected);
        console.log(this.salesmanSelected);
        this.openSchedule = true;
    }

    getEmptySchedules(freeVisits:number){
      var result = Array.from({ length: freeVisits }, (_, i) => ({
        id: i,
        nameCustomer: '',
        appointment: '',
        address: '',
        filled: false
      }));

      return result;
    }

    setDate(salesman:GeneralTaskTreeDTO){
      if(salesman.label == 'Monday'){
        this.newAppointment = this.mondayDate;
        console.log('from Monday:' + this.newAppointment);
      }
      if(salesman.label == 'Tuesday'){
        this.newAppointment = this.tusdayDate;
        console.log('from Tuesday:' + this.newAppointment);
      }
      if(salesman.label == 'Wednesday'){
        this.newAppointment = this.wednesdayDate;
        console.log('from Wednesday:' + this.newAppointment);
      }
      if(salesman.label == 'Thursday'){
        this.newAppointment = this.thursdayDate;
        console.log('from Thursday:' + this.newAppointment);
      }
      if(salesman.label == 'Friday'){
        this.newAppointment = this.fridayDate;
        console.log('from Friday:' + this.newAppointment);
      }
      if(salesman.label == 'Saturday'){
        this.newAppointment = this.saturdayDate;
        console.log('from Saturday:' + this.newAppointment);
      }
      if(salesman.label == 'Sunday'){
        this.newAppointment = this.sundayDate;
        console.log('from Sunday:' + this.newAppointment);
      }
    }

    getAllSalesman(){
        this.salesService.GetSalesman().subscribe(
          response => {
            this.salesmans = response;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }

    getAllScheduleControl(){
        this.scheduleFilter.startFilter = this.startFilter;
        this.scheduleFilter.endFilter = this.endFilter;
        this.scheduleFilter.idUser = this.salesman.id;
        this.scheduleFilter.nameCustomer = this.salesName;

        this.pipelineService.GetScheduleControl(this.scheduleFilter).subscribe(
          response => {
            this.treeValue = response;
            this.loading = false;
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
    }

    getAllTasks(){
        this.nodeService.GetAllTree(this.dateFilter).subscribe(
          response => {
            this.treeValue = response;
            console.log(this.treeValue);
          },
          error => {
            console.error('Error:', error);  // Handle the error here
          }
        );
      }

    filterSalesman(event: any) {
        const query = event.query.toLowerCase();
        this.salesName = query;
        this.filteredSalesman = this.salesmans.filter(item =>
          item.name.toLowerCase().includes(query)
        );
    }

    addSchedule(){
      this.opportunity.appointment = this.formatDateToString(this.newAppointment); 
      this.opportunity.owner = this.salesmanSelected.parentName;
      this.opportunity.idUser = this.salesmanSelected.parentId;

      this.pipelineService.AddScheduleControl(this.opportunity).subscribe(
            response => {
              this.updateSchedule(response);
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    updateSchedule(response:CheckNewSchedule){

      this.checkSchedule = response;
      if(response.hasOpportunity){
        this.openDoubleCheck = true;
      }else{
        //window.location.reload();
        //this.opportunity.id = response.idOpportunity;
        //this.freeItem.nameCustomer=this.opportunity.nameCustomer;
        //this.freeItem.filled = true;
        window.location.reload();
      }
    }

    finalUpdateSchedule(){
      this.checkSchedule.schedule = this.newAppointment;
      this.checkSchedule.idUser = this.salesmanSelected.parentId;
      
      this.pipelineService.UpdateScheduleControl(this.checkSchedule).subscribe(
            response => {
              window.location.reload();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    formatDateToString(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    constructor(private salesService:SalesService, private nodeService: NodeService, private pipelineService: PipelineService
        ) {}
}
