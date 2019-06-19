import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
    declarations: [
        LoginComponent
    ],
    entryComponents: []
})
export class LoginModule {}