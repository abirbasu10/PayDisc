import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

const routes: Routes =[
    /* { path: 'landing', component: LandingComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' } */
    { path:'admin', component:AdminComponent},
    { path:'user', component:UserComponent}
];

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }