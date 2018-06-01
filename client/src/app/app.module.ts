import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import{HashLocationStrategy,LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { MatSlideToggleModule,MatTableDataSource, MatListModule,MatDividerModule,MatTabsModule,MatCardModule, MatInputModule,MatChipsModule,MatFormFieldModule,MatFormFieldControl,MatSelectModule,MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule,MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';



import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './User/navbar/navbar.component';
import { NavbarService } from './navbar.service';
import { ListOfOffersComponent } from './User/list-of-offers/list-of-offers.component';
import { OfferDetailsComponent } from './User/offer-details/offer-details.component';
import { PaginationService } from './pagination.service';
import { DataExchangeService } from './data-exchange.service';
import { OffersService } from './offers.service';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    ListOfOffersComponent,
    OfferDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatTabsModule,
    MatCardModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,

    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatStepperModule,
    MatIconModule,
    MatChipsModule,


    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
  providers: [NavbarService,
              PaginationService,
              DataExchangeService,
              OffersService,
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
