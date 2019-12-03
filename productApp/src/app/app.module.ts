import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import{ReactiveFormsModule} from '@angular/forms';

import {AngularWebStorageModule} from 'angular-web-storage';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { EditComponent } from './edit/edit.component';
import {RatingModule} from 'ngx-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    HeaderComponent,
    AddproductsComponent,
    EditComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularWebStorageModule,
    ReactiveFormsModule,
    RatingModule

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
