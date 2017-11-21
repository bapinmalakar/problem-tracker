import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { UserAuthService } from './shared/services/userAuth.service';
import { ValidationService } from './shared/services/validation.service';
import { CookieService } from './shared/cookies.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultPageComponent
  ],
  providers: [UserService, UserModelService, UserAuthService, ValidationService, CookieService],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
