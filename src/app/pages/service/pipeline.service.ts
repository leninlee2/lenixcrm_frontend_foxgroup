import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './constants';
import { CategoryDTO } from '../../dto/categorydto';
import { OpportunityDTO } from '../../dto/opportunitydto';
import { OpportunityPipelineDTO, CheckNewSchedule } from '../../dto/opportunitypipelinedto';
import { NotesDTO } from '../../dto/notesdto';
import { PipelineDTO } from '../../dto/pipelinedto';
import { FromSourceDTO } from '../../dto/fromsourcedto';
import { CalendarDTO } from '../../dto/calendardto';
import { OpportunityFileDTO } from '../../dto/opportunityfiledto';
import { FileTypeDTO } from '../../dto/filetypedto';
import { SalesmanDTO } from '../../dto/salesmandto';
import { S3UrlDTO } from '../../dto/s3urldto';
import { CustomRolesDTO } from '../../dto/customrolesdto';
import { CustomFormDTO } from '../../dto/customformdto';
import { ReviewFormDTO } from '../../dto/reviewformdto';
import { GaveUpFormDTO } from '../../dto/gaveupformdto';
import { DashboardQtde } from '../../dto/dashboardqtde';
import { LogChangeTabDTO } from '../../dto/logchangetabdto';
import { GeneralTaskTreeDTO , ScheduleAreaDTO, ScheduleControlDTO } from '../../dto/generaltasktreedto';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class PipelineService {
    private apiUrlCategory = ApiUrl + '/category/all';
    private apiUrlOpPipe = ApiUrl + '/opportunitypipeline/getbycategory';
    private apiUrlUpdate = ApiUrl + '/opportunitypipeline/update';
    private apiUrlAdd = ApiUrl + '/opportunitypipeline/add';
    private apiUrlUpdateDetail = ApiUrl + '/opportunitypipeline/updatedetail';
    private apiUrlUploadFile = ApiUrl + '/opportunitypipeline/uploadfiles3';
    private apiUrlInactiveFile = ApiUrl + '/opportunitypipeline/inactivefile';

    private apiUrlNotes = ApiUrl + '/opportunitypipeline/getnotes';
    private apiUrlAddNote = ApiUrl + '/opportunitypipeline/addnote';
    private apiUrlDeleteNote = ApiUrl + '/opportunitypipeline/deletenote';

    private apiUrlPipeline = ApiUrl + '/opportunitypipeline/getpipeline';
    private apiUrlAddPipeline = ApiUrl + '/opportunitypipeline/addpipeline';
    private apiUrlUpdatePipeline = ApiUrl + '/opportunitypipeline/updatepipeline';
    private apiUrlInactivePipeline = ApiUrl + '/opportunitypipeline/inactivepipeline';
    private apiUrlAddCategory = ApiUrl + '/category/addcategory';
    private apiUrlUpdateCategory = ApiUrl + '/category/updatecategory';
    private apiUrlInactiveCategory = ApiUrl + '/category/inactivecategory';
    private apiUrlInactiveOpportunity = ApiUrl + '/opportunitypipeline/inactiveopportunity';
    private apiUrlInactiveChat = ApiUrl + '/opportunitypipeline/inactivechat';
    private apiUrlPipelineCategory = ApiUrl + '/opportunitypipeline/getpipelinebycategory';
    private apiUrlUpdateOrder = ApiUrl + '/opportunitypipeline/updateorder';
    private apiUrlGetCalendar = ApiUrl + '/opportunitypipeline/getcalendar';
    private apiUrlGetSingleOpportunity = ApiUrl + '/opportunitypipeline/getopportunity';
    private apiUrlGetFileNames = ApiUrl + '/opportunitypipeline/getfilenamess3';
    private apiUrlGetFileById = ApiUrl + '/opportunitypipeline/getfilebyid';
    private apiUrlGetFileS3ById = ApiUrl + '/opportunitypipeline/getfiles3';

    private apiGetFileType = ApiUrl + '/opportunitypipeline/getfiletypes';
    private apiAddFileType = ApiUrl + '/opportunitypipeline/addfiletype';
    private apiUpdateFileType = ApiUrl + '/opportunitypipeline/updatefiletype';
    private apiInactiveFileType = ApiUrl + '/opportunitypipeline/inactivefiletype';

    private apiGetCustomRoles = ApiUrl + '/opportunitypipeline/getcustomroles';
    private apiGetCustomForms = ApiUrl + '/opportunitypipeline/getcustomforms';
    private apiAddReviewForm = ApiUrl + '/opportunitypipeline/addreviewform';
    private apiHasForm = ApiUrl + '/opportunitypipeline/hasform';
    private apiHasFilesEstimate = ApiUrl + '/opportunitypipeline/hasallestimatefiles';
    private apiHasFileClosing = ApiUrl + '/opportunitypipeline/hasallclosingfiles';
    private apiHasFileClosed = ApiUrl + '/opportunitypipeline/hasallclosedfiles';
    private apiHasGaveUpForm = ApiUrl + '/opportunitypipeline/hasformgaveup';
    private apiAddGaveUpForm = ApiUrl + '/opportunitypipeline/addgaveupform';

    private apiGetReviewForm = ApiUrl + '/opportunitypipeline/getformreview';
    private apiGetGaveUpForm = ApiUrl + '/opportunitypipeline/getgaveupform';
    private apiGetDashboardQtde = ApiUrl + '/opportunitypipeline/getdashboardqtde';

    private apiGetLogChangeTab = ApiUrl + '/opportunitypipeline/getlogchangetab';

    private apiGetScheduleControl = ApiUrl + '/opportunitypipeline/getschedulecontrol';

    private apiUpdateNameCustomer = ApiUrl + '/opportunitypipeline/updatenamecustomer';
    private apiUpdatePhone = ApiUrl + '/opportunitypipeline/updatephone';
    private apiUpdateAddress = ApiUrl + '/opportunitypipeline/updateaddress';
    private apiUpdateEmail = ApiUrl + '/opportunitypipeline/updateemail';
    private apiUpdateSetters = ApiUrl + '/opportunitypipeline/updatesetters';
    private apiUpdateDetails = ApiUrl + '/opportunitypipeline/updatedetails';
    private apiUpdateAppointment = ApiUrl + '/opportunitypipeline/updateappointment';

    private apiScheduleControl = ApiUrl + '/opportunitypipeline/schedulecontrol';
    private apiUpdateScheduleControl = ApiUrl + '/opportunitypipeline/updateschedulecontrol';
    private apiAddScheduleArea= ApiUrl + '/opportunitypipeline/addschedulearea';


    constructor(private http: HttpClient) {}

    AddScheduleArea(area: ScheduleAreaDTO): Observable<number> {
        return this.http.post<number>(this.apiAddScheduleArea,area);
    }

    AddScheduleControl(opportunity: OpportunityPipelineDTO): Observable<CheckNewSchedule> {
        return this.http.post<CheckNewSchedule>(this.apiScheduleControl,opportunity);
    }

    UpdateScheduleControl(opportunity: CheckNewSchedule): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateScheduleControl,opportunity);
    }

    UpdateAppointment(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateAppointment,opportunity);
    }

    UpdateDetails(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateDetails,opportunity);
    }

    UpdateSetters(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateSetters,opportunity);
    }

    UpdateEmail(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateEmail,opportunity);
    }

    UpdateAddress(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateAddress,opportunity);
    }

    UpdatePhone(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdatePhone,opportunity);
    }

    UpdateNameCustomer(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUpdateNameCustomer,opportunity);
    }

    HasForm(idOpportunity:number): Observable<boolean> {
        var url = this.apiHasForm + '?idOpportunity=' + idOpportunity;
        return this.http.get<boolean>(url);
    }

    HasGaveUpForm(idOpportunity:number): Observable<boolean> {
        var url = this.apiHasGaveUpForm + '?idOpportunity=' + idOpportunity;
        return this.http.get<boolean>(url);
    }

    HasFilesClosed(idOpportunity:number): Observable<boolean> {
        var url = this.apiHasFileClosed + '?idOpportunity=' + idOpportunity;
        return this.http.get<boolean>(url);
    }

    HasFilesEstimate(idOpportunity:number): Observable<boolean> {
        var url = this.apiHasFilesEstimate + '?idOpportunity=' + idOpportunity;
        return this.http.get<boolean>(url);
    }

    HasFilesClosing(idOpportunity:number): Observable<boolean> {
        var url = this.apiHasFileClosing + '?idOpportunity=' + idOpportunity;
        return this.http.get<boolean>(url);
    }

    GetLogChangeTab(idOpportunity:number): Observable<LogChangeTabDTO[]> {
        var url = this.apiGetLogChangeTab + '?idOpportunity=' + idOpportunity;
        return this.http.get<LogChangeTabDTO[]>(url);
    }

    GetScheduleControl(scheduleFilter:ScheduleControlDTO): Observable<GeneralTaskTreeDTO[]> {
        return this.http.post<GeneralTaskTreeDTO[]>(this.apiGetScheduleControl,scheduleFilter);
    }

    GetCustomForms(): Observable<CustomFormDTO[]> {
        return this.http.get<CustomFormDTO[]>(this.apiGetCustomForms);
    }

    GetCustomRoles(): Observable<CustomRolesDTO[]> {
        return this.http.get<CustomRolesDTO[]>(this.apiGetCustomRoles);
    }
    
    GetCategory(user:string): Observable<CategoryDTO[]> {
        var url = this.apiUrlCategory + '?user=' + user;
        return this.http.get<CategoryDTO[]>(url);
    }

    GetOpportunityPipelines(idCategory:number): Observable<OpportunityDTO[]> {
        var url = this.apiUrlOpPipe + '?idCategory=' + idCategory;
        return this.http.get<OpportunityDTO[]>(url);
    }

    GetOpportunityPipelinesAllFilter(idCategory:number,salesCustomerFilter:SalesmanDTO,email:string): Observable<OpportunityDTO[]> {
        var url = this.apiUrlOpPipe + '?idCategory=' + idCategory;

        if(salesCustomerFilter.name != ''){
            url+= '&search=' + salesCustomerFilter.name;
            url+= '&type=' + salesCustomerFilter.type;
            url+= '&personId=' + salesCustomerFilter.id;
        }

        url+= '&email=' + email;

        return this.http.get<OpportunityDTO[]>(url);
    }

    Update(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        var url = this.apiUrlUpdate;
        return this.http.post<boolean>(url,opportunity);
    }

    Add(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        console.log(opportunity);
        var url = this.apiUrlAdd;
        return this.http.post<boolean>(url,opportunity);
    }

    AddReviewForm(reviewForm: ReviewFormDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiAddReviewForm,reviewForm);
    }

    GetReviewForm(idOpportunity: number): Observable<ReviewFormDTO> {
        var url = this.apiGetReviewForm + '?idOpportunity=' + idOpportunity ;
        return this.http.get<ReviewFormDTO>(url);
    }

    GetDashboardQtde(): Observable<DashboardQtde[]> {
        return this.http.get<DashboardQtde[]>(this.apiGetDashboardQtde);
    }

    GetGaveUpForm(idOpportunity: number): Observable<GaveUpFormDTO> {
        var url = this.apiGetGaveUpForm + '?idOpportunity=' + idOpportunity ;
        return this.http.get<GaveUpFormDTO>(url);
    }

    AddGaveUpForm(gaveUpForm: GaveUpFormDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiAddGaveUpForm,gaveUpForm);
    }

    UpdateOpportunity(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        console.log(opportunity);
        var url = this.apiUrlUpdateDetail;
        return this.http.post<boolean>(url,opportunity);
    }

    UploadFile(formData:FormData): Observable<boolean>{
        return this.http.post<boolean>(this.apiUrlUploadFile, formData);
    }

    InactiveFile(id:number): Observable<boolean>{
        return this.http.post<boolean>(this.apiUrlInactiveFile, id);
    }

    GetNotes(idOpportunity:number): Observable<NotesDTO[]> {
        var url = this.apiUrlNotes + '?idOpportunity=' + idOpportunity;
        return this.http.get<NotesDTO[]>(url);
    }

    AddNote(notesdto: NotesDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlAddNote,notesdto);
    }

    DeleteNote(notesdto: NotesDTO): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrlDeleteNote,notesdto);
    }

    GetPipelines(): Observable<PipelineDTO[]> {
        return this.http.get<PipelineDTO[]>(this.apiUrlPipeline);
    }

    AddPipeline(pipelineDto: PipelineDTO): Observable<boolean> {
        var url = this.apiUrlAddPipeline;
        return this.http.post<boolean>(url,pipelineDto);
    }

    UpdatePipeline(pipelineDto: PipelineDTO): Observable<boolean> {
        var url = this.apiUrlUpdatePipeline;
        return this.http.post<boolean>(url,pipelineDto);
    }

    InactivePipeline(pipelineDto: PipelineDTO): Observable<boolean> {
        var url = this.apiUrlInactivePipeline;
        return this.http.post<boolean>(url,pipelineDto);
    }

    AddCategory(category: CategoryDTO): Observable<boolean> {
        var url = this.apiUrlAddCategory;
        return this.http.post<boolean>(url,category);
    }

    UpdateCategory(category: CategoryDTO): Observable<boolean> {
        var url = this.apiUrlUpdateCategory;
        return this.http.post<boolean>(url,category);
    }

    InactiveCategory(category: CategoryDTO): Observable<boolean> {
        var url = this.apiUrlInactiveCategory;
        return this.http.post<boolean>(url,category);
    }

    InactiveOpportunity(opportunity: OpportunityPipelineDTO): Observable<boolean> {
        var url = this.apiUrlInactiveOpportunity;
        return this.http.post<boolean>(url,opportunity);
    }

    InactiveChat(fromSource: FromSourceDTO): Observable<boolean> {
        var url = this.apiUrlInactiveChat;
        return this.http.post<boolean>(url,fromSource);
    }

    GetPipelineByCategory(idCategory: number): Observable<PipelineDTO[]> {
        var url = this.apiUrlPipelineCategory + '?idCategory=' + idCategory;
        return this.http.get<PipelineDTO[]>(url);
    }

    UploadOrder(pipelineDTO:PipelineDTO): Observable<boolean>{
        return this.http.post<boolean>(this.apiUrlUpdateOrder, pipelineDTO);
    }

    GetCalendar(): Observable<CalendarDTO[]> {
        return this.http.get<CalendarDTO[]>(this.apiUrlGetCalendar);
    }

    GetSingleOpportunity(id:number): Observable<OpportunityPipelineDTO> {
        var url = this.apiUrlGetSingleOpportunity + '?id=' + id;
        return this.http.get<OpportunityPipelineDTO>(url);
    }

    GetOpportunityFiles(idOpportunity:number): Observable<FileTypeDTO[]> {
        var url = this.apiUrlGetFileNames + '?idOpportunity=' + idOpportunity;
        return this.http.get<FileTypeDTO[]>(url);
    }

    GetFileById(id:number): Observable<OpportunityFileDTO> {
        var url = this.apiUrlGetFileById + '?id=' + id;
        return this.http.get<OpportunityFileDTO>(url);
    }

    GetFileS3ByName(id:number): Observable<S3UrlDTO> {
        var url = this.apiUrlGetFileS3ById + '?idFile=' + id;
        return this.http.get<S3UrlDTO>(url);
    }

    GetFileTypes(): Observable<FileTypeDTO[]> {
        return this.http.get<FileTypeDTO[]>(this.apiGetFileType);
    }

    AddFileType(fileTypeDTO:FileTypeDTO): Observable<boolean>{
        return this.http.post<boolean>(this.apiAddFileType, fileTypeDTO);
    }

    UpdateFileType(fileTypeDTO:FileTypeDTO): Observable<boolean>{
        return this.http.post<boolean>(this.apiUpdateFileType, fileTypeDTO);
    }

    InativeFileType(fileTypeDTO:FileTypeDTO): Observable<boolean>{
        return this.http.post<boolean>(this.apiInactiveFileType, fileTypeDTO);
    }

}
