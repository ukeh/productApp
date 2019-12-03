import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{path:"", component:LoginComponent},{path:"signup",component:SignupComponent},{path:"products",component:ProductsComponent},
{path:"addproducts",component:AddproductsComponent}, {path:"edit",component:EditComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
