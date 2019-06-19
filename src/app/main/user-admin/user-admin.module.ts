import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminRoutingModule } from './user-admin-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { SearchUserCriteriaComponent } from './search-user/search-user-criteria/search-user-criteria.component';
import { UserListComponent } from './search-user/user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { Ng2PaginationModule } from 'ng2-pagination'; 
import { Ng2OrderModule } from 'ng2-order-pipe';
import { UserListPipe } from './search-user/user-list/user-list.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserAdminComponent } from './user-admin.component';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserAdminRoutingModule,
    FormsModule,
    AngularMultiSelectModule,
    Ng2PaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    OrderModule
  ],
  declarations: [AddUserComponent, SearchUserComponent, SearchUserCriteriaComponent, UserListComponent, UserListPipe, UserAdminComponent]
})
export class UserAdminModule { }
