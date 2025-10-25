import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../service/authentication.service';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule
        , FormsModule, RouterModule, RippleModule, AppFloatingConfigurator,DialogModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    cookie: CookieService;
    generalWarnMessage:boolean = false;
    generalMessage:string = '';

    constructor(private cookieService: CookieService, private authenticationService: AuthenticationService) {
        this.cookie = cookieService;

        if(this.isTokenAlive()){
            window.location.href='/uikit/dashboard';
        }else{
            
        }
    }

    isTokenAlive(){
        let tokendata = this.cookie.get('token');
        console.log(tokendata);
 
        if(tokendata != undefined && tokendata != ''){
           return true;
        }else{
           return false;
        }
 
     }

    authentication(){
        console.log('authentication');
        let loginData = {email: this.email, password: this.password, name:'', phone: ''
          , createdDate: new Date(),id: 0, groupName:'',idFile:0};

        this.authenticationService.GetToken(loginData).subscribe(
            response => {
              //console.log('Response:', response);  // Handle the response here
              if(response.status){
                this.cookie.set('token',response.token);
                this.cookie.set('email',this.email);
                this.cookie.set('isOwner',response.isOwner.toString());
                window.location.href='/uikit/dashboard';
              }else{
                this.generalMessage = 'Invalid Login or Password';
                this.generalWarnMessage = true;
                console.log('invalid login or password');
                this.cookie.delete('token');
                this.cookie.delete('email');
                this.cookie.delete('isOwner');
              }
            },
            error => {
              console.error('Error:', error);  // Handle the error here
              this.cookie.delete('token');
              this.cookie.delete('email');
            }
        );

        
    }
}
