import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckEmailComponent } from './check-email/check-email.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PetComponent } from './pet/pet.component';
import { RegisterComponent } from './register/register.component';
import { ShelterComponent } from './shelter/shelter.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path: "register", component: RegisterComponent},
  {path:"login",component: LoginComponent},
  {path:"home",component: HomeComponent},
  {path: "shelter", component: ShelterComponent},
  {path: "pet/:id", component: PetComponent},
  {path: "register_successed", component: CheckEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
