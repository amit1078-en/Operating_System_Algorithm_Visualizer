import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { SchedulingalgorithmsComponent } from './schedulingalgorithms/schedulingalgorithms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PagereplacementComponent } from './pagereplacement/pagereplacement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    SchedulingalgorithmsComponent,
    AboutusComponent,
    PagereplacementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
