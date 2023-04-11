import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { UsersComponent } from './component/users/users.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ViewuerComponent } from './component/viewuer/viewuer.component';
import { BloglistComponent } from './component/bloglist/bloglist.component';
import { ViewblogComponent } from './component/viewblog/viewblog.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxPaginationModule } from 'ngx-pagination';
import { MyblogComponent } from './component/myblog/myblog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    BlogsComponent,
    UsersComponent,
    HomeComponent,
    RegisterComponent,
    ViewuerComponent,
    BloglistComponent,
    ViewblogComponent,
    MyblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
