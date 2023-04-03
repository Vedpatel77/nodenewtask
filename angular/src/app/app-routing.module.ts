import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { UsersComponent } from './component/users/users.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { RegisterComponent } from './component/register/register.component';
import { ViewuerComponent } from './component/viewuer/viewuer.component';
import { BloglistComponent } from './component/bloglist/bloglist.component';
import { ViewblogComponent } from './component/viewblog/viewblog.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'users',component:UsersComponent},
  {path:'users/:id',component:ViewuerComponent},
  {path:'blogslist',component:BloglistComponent},
  {path:'viewblog',component:ViewblogComponent},
  {path:'blogs/addblog',component:BlogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
