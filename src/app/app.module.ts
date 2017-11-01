import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { DefaultPageComponent } from './default-page/default-page.component';
// import { SharedModule } from './shared/shared.module';

//modules
import { AppRoutingModule } from './routing.module';
import { HomeModule } from './home/home.module';

//services
import { UserService } from './shared/services/guard/user.service';
import { UserModelService } from './shared/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultPageComponent
  ],
  providers: [UserService, UserModelService],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
