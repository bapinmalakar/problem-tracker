import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FormsModule } from '@angular/forms';

import { HomeRouteModule } from './homeroute.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRouteModule,
    FormsModule
  ],
  declarations: [HomeComponent, HeaderComponent, ListPageComponent, ProfileComponent, SettingComponent]
})
export class HomeModule { }
