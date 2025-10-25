import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { CriticityDTO } from '../../dto/criticitydto';
import { WorkflowTableDTO } from '../../dto/workflowtabledto';
import { SysTableDTO } from '../../dto/systabledto';
import { WorkflowFieldDTO } from '../../dto/workflowfielddto';
import { SysColumnDTO } from '../../dto/syscolumndto';
import { WorkflowAutomationDTO } from '../../dto/workflowautomationdto';
import { GeneralTaskItemDTO } from '../../dto/generaltaskItemdto';
import { OperatorDTO } from '../../dto/operatordto';
import { WorkflowItemOrGroupDTO } from '../../dto/workflowItemorgroup';
import { WorkflowTemplateDTO } from '../../dto/workflowtemplatedto';
import { PipelineDTO } from '../../dto/pipelinedto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class AutomationService {
    // Sales Commission
    private apiUrlGetCriticity = ApiUrl + '/criticity/all';
    private apiUrlAddCriticity = ApiUrl + '/criticity/add';
    private apiUrlUpdateCriticity = ApiUrl + '/criticity/update';
    private apiUrlInactivateCriticity = ApiUrl + '/criticity/inactivate';

    private apiUrlGetWorkflowTables = ApiUrl + '/workflowtable/all';
    private apiUrlGetSysTables = ApiUrl + '/workflowtable/getsystables';
    private apiUrlAddWorkflowTable = ApiUrl + '/workflowtable/add';
    private apiUrlUpdateWorflowTable = ApiUrl + '/workflowtable/update';
    private apiUrlInactivateWorkflowTable = ApiUrl + '/workflowtable/inactivate';


    private apiUrlGetWorkflowFields = ApiUrl + '/workflowfield/all';
    private apiUrlGetSysColumns = ApiUrl + '/workflowfield/getsyscolumns';
    private apiUrlAddWorkflowField = ApiUrl + '/workflowfield/add';
    private apiUrlUpdateWorkflowField = ApiUrl + '/workflowfield/update';
    private apiUrlInactiveWorkflowField = ApiUrl + '/workflowfield/inactivate';
    private apiUrlGetOperators = ApiUrl + '/workflowfield/getoperators';
    private apiUrlGetUnities = ApiUrl + '/workflowfield/getunities';

    private apiUrlGetAllAutomation = ApiUrl + '/workflowautomation/all';
    private apiUrlAddWorkflowAutomation = ApiUrl + '/workflowautomation/add';
    private apiUrlUpdateWorkflowAutomation = ApiUrl + '/workflowautomation/update';
    private apiUrlInactivateWorkflowAutomation = ApiUrl + '/workflowautomation/inactivate';
    private apiUrlGetGroups = ApiUrl + '/workflowautomation/getgroups';
    private apiUrlAddRole = ApiUrl + '/workflowautomation/addrole';
    private apiUrlGetActions = ApiUrl + '/workflowautomation/getactions';
    private apiUrlInactiveRole = ApiUrl + '/workflowautomation/inactiverole';
    private apiUrlGetTemplates = ApiUrl + '/workflowautomation/gettemplates';
    private apiUrlGetTabs = ApiUrl + '/workflowautomation/gettabs';

    constructor(private http: HttpClient) {}

    GetTabs(): Observable<PipelineDTO[]> {
        return this.http.get<PipelineDTO[]>(this.apiUrlGetTabs);
    }

    GetTemplates(): Observable<WorkflowTemplateDTO[]> {
        return this.http.get<WorkflowTemplateDTO[]>(this.apiUrlGetTemplates);
    }

    GetCriticity(): Observable<CriticityDTO[]> {
        return this.http.get<CriticityDTO[]>(this.apiUrlGetCriticity);
    }

    GetOperators(): Observable<OperatorDTO[]> {
        return this.http.get<OperatorDTO[]>(this.apiUrlGetOperators);
    }

    GetActions(): Observable<WorkflowAutomationDTO[]> {
        return this.http.get<WorkflowAutomationDTO[]>(this.apiUrlGetActions);
    }

    GetUnities(): Observable<OperatorDTO[]> {
        return this.http.get<OperatorDTO[]>(this.apiUrlGetUnities);
    }

    AddCriticity(criticity: CriticityDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddCriticity,criticity);
    }

    AddRole(role: WorkflowItemOrGroupDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddRole,role);
    }

    InactiveRole(id: number): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactiveRole,id);
    }

    UpdateCriticity(criticity: CriticityDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateCriticity,criticity);
    }

    InactivateCriticity(criticity: CriticityDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateCriticity,criticity);
    }

    GetAllWorkflowTables(): Observable<WorkflowTableDTO[]> {
        return this.http.get<WorkflowTableDTO[]>(this.apiUrlGetWorkflowTables);
    }

    GetSysTables(): Observable<SysTableDTO[]> {
        return this.http.get<SysTableDTO[]>(this.apiUrlGetSysTables);
    }

    AddWorkflowTable(workflowTable: WorkflowTableDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddWorkflowTable,workflowTable);
    }

    UpdateWorkflowTable(workflowTable: WorkflowTableDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateWorflowTable,workflowTable);
    }

    InactivateWorkflowTable(workflowTable: WorkflowTableDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateWorkflowTable,workflowTable);
    }

    GetWorkflowFields(): Observable<WorkflowFieldDTO[]> {
        return this.http.get<WorkflowFieldDTO[]>(this.apiUrlGetWorkflowFields);
    }

    GetSysColumns(idSTable:number): Observable<SysColumnDTO[]> {
        var url = this.apiUrlGetSysColumns + '?idSTable=' + idSTable;
        return this.http.get<SysColumnDTO[]>(url);
    }

    AddWorkflowField(workflowField: WorkflowFieldDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddWorkflowField,workflowField);
    }

    UpdateWorkflowField(workflowField: WorkflowFieldDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateWorkflowField,workflowField);
    }

    InactivateWorkflowField(workflowField: WorkflowFieldDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactiveWorkflowField,workflowField);
    }

    GetAllWorkflowAutomation(): Observable<WorkflowAutomationDTO[]> {
        return this.http.get<WorkflowAutomationDTO[]>(this.apiUrlGetAllAutomation);
    }

    AddWorkflowAutomation(workflowAutomation: WorkflowAutomationDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddWorkflowAutomation,workflowAutomation);
    }

    UpdateWorkflowAutomation(workflowAutomation: WorkflowAutomationDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlUpdateWorkflowAutomation,workflowAutomation);
    }

    InactivateWorkflowAutomation(workflowAutomation: WorkflowAutomationDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlInactivateWorkflowAutomation,workflowAutomation);
    }

    GetAllWorkflowGroups(idWorkflow:number): Observable<GeneralTaskItemDTO[]> {
        var url = this.apiUrlGetGroups + '?idWorkflow=' + idWorkflow;
        return this.http.get<GeneralTaskItemDTO[]>(url);
    }

}