import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './User/navbar/navbar.component';
import { ListOfOffersComponent } from './User/list-of-offers/list-of-offers.component';
import { OfferDetailsComponent } from './User/offer-details/offer-details.component';

const routes: Routes =[
    /* { path: 'landing', component: LandingComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' } */
    { path:'admin', component:AdminComponent},
    
    
    
    { path:'user', component:UserComponent},
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path:'user/navbar', component:NavbarComponent},
    /* { path:'user/offers', component:ListOfOffersComponent}, */
    { path:'user/offers/:city/:offerStream/:offerDomain', component:ListOfOffersComponent, 
    runGuardsAndResolvers:'paramsChange'},
    { path:'user/offerDetails/:offerName', component:OfferDetailsComponent},
];

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }