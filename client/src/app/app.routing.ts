import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NearByOffersComponent } from './User/near-by-offers/near-by-offers.component';
import { OffersHereComponent } from './user/offers-here/offers-here.component';

const routes: Routes =[
    /* { path: 'landing', component: LandingComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' } */
    { path:'admin', component:AdminComponent},
    { path:'user', component:UserComponent},
    { path:'nearByOffer', component:NearByOffersComponent},
    { path:'offersHere', component:OffersHereComponent}
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