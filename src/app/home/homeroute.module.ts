import { NgModule } from '@angular/core';
import { ListPageComponent } from './list-page/list-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
const homeRoute: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', component: ListPageComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'setting', component: SettingComponent }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoute)
    ],
    exports: [RouterModule]
})

export class HomeRouteModule { }
