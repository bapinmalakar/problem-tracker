import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { LoginComponent } from './shared/login/login.component';

//guard
import { UserService } from './shared/services/guard/user.service';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', loadChildren: 'app/home/home.module#HomeModule', canActivate: [UserService] },
    { path: 'auth', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: DefaultPageComponent },
];
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

