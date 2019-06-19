import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PLMComponent } from './plm.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'help', loadChildren: './help/help.module#HelpModule' },
    { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
    { path: '', loadChildren: './main/main.module#MainModule', canActivate: [AuthGuard], data: { path : 'dashboard'}  },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PLMRoutingModule {}
