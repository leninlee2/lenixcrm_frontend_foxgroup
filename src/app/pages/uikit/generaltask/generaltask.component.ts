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
import { GeneralTaskTreeDTO } from '../../../dto/generaltasktreedto';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-general-task',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule
        ,AutoCompleteModule,DatePickerModule,ButtonModule,DialogModule,InputTextModule,CheckboxModule],
    templateUrl: './generaltask.component.html',
    styleUrl: './generaltask.component.css',
    providers: [NodeService]
})
export class GeneralTaskComponent implements OnInit {
    treeValue: TreeNode[] = [];

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

    openedTask:boolean = false;

    generalItemTask:GeneralTaskItemDTO = new GeneralTaskItemDTO(0,0,'',new Date(),0,false,true,false);

    ngOnInit() {
        this.getAllSalesman();
        this.getAllTasks();
        //this.nodeService.getFiles().then((files) => (this.treeValue = files));
        //this.nodeService.getTreeTableNodes().then((files: any) => (this.treeTableValue = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectedTreeTableValue = {
            '0-0': {
                partialChecked: false,
                checked: true
            }
        };
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

    openTaskItemNew(node:GeneralTaskTreeDTO){
        this.generalItemTask = new GeneralTaskItemDTO(node.id,node.idGeneralTask,'',this.dateFilter,node.parentId,false,true,false);
        this.openedTask = true;
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
        this.filteredSalesman = this.salesmans.filter(item =>
          item.name.toLowerCase().includes(query)
        );
    }

    addGeneralTask(){
        this.generalTask = new GeneralTaskDTO(0,this.salesman.id,this.salesman.name, this.dateFilter);

        this.nodeService.AddGeneralTask(this.generalTask).subscribe(
            response => {
              this.getAllTasks();
            },
            error => {
              console.error('Error:', error);  // Handle the error here
            }
          );
    }

    addTask(){
      
      var copyTask = this.generalItemTask;

      if(this.generalItemTask.parentId == 0)
        copyTask.firstLevel = true;

      console.log(this.generalItemTask);

      if(copyTask.id > 0)
        copyTask.parentId = copyTask.id;//change the level
      
      

      console.log(copyTask);
      this.nodeService.AddGeneralTaskItem(copyTask).subscribe(
        response => {
          this.getAllTasks();
          this.openedTask = false;
        },
        error => {
          console.error('Error:', error);  // Handle the error here
        }
      );
    }

    constructor(private salesService:SalesService, private nodeService: NodeService
        ) {}
}
