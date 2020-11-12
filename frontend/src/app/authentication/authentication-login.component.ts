import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-authentication-login',
    template: `            
        <form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)">
            <div *ngIf="error" class="alert-danger">
                <h4>{{ error }}</h4>
            </div>
            <div class="form-group">
                <label for="login">{{'authentication.login' | translate}}</label>
                <input
                        type="text"
                        id="login"
                        name="login"
                        class="form-control"
                        [ngModel]
                        #login="ngModel"
                        required
                />
                <app-input-error [control]="login.control"></app-input-error>
            </div>
            <div class="form-group">
                <label for="password">{{'authentication.password' | translate}}</label>
                <input
                        type="password"
                        id="password"
                        class="form-control"
                        name="password"
                        [ngModel]
                        #password="ngModel"
                        required
                        minlength="6"
                />
                <app-input-error [control]="password.control"></app-input-error>
            </div>
            <div>
                <button
                        class="btn btn-primary"
                        type="submit"
                        [disabled]="!authForm.valid"
                >{{'authentication.log-in' | translate}}</button>
            </div>
        </form>
    `
})

export class AuthenticationLoginComponent {

    @Output() loadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    error: string;
    password: string;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }

    onSubmit(form: NgForm): void {
        if (!form.valid) {
            return;
        }
        const login = form.value.login;
        const password = form.value.password;
        this.loadingChanged.emit(true);
        const authObservable = this.authenticationService.login(login, password);
        authObservable.subscribe(
            _ => {
                this.loadingChanged.emit(false);
                this.router.navigateByUrl('/');
            },
            error => {
                console.log(error);
                this.error = error;
                this.loadingChanged.emit(false);
            }
        );
        form.reset();
    }

}
