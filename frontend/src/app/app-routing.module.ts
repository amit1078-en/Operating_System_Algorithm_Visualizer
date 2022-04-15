import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { PagereplacementComponent} from './pagereplacement/pagereplacement.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SchedulingalgorithmsComponent } from './schedulingalgorithms/schedulingalgorithms.component';
const routes: Routes = [
  
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'PageReplacementAlgorithm',component:PagereplacementComponent},
  {path:'Aboutus',component:AboutusComponent},
  {path:'SchedulingAlgorithm',component:SchedulingalgorithmsComponent},
  {path:'user',component:UserhomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
