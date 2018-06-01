import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import{HashLocationStrategy,LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';

import { MatSlideToggleModule,MatTableDataSource, MatAutocompleteModule,MatInput,MatOptionModule,MatListModule,MatDividerModule,MatTabsModule,MatCardModule, MatInputModule,MatChipsModule,MatFormFieldModule,MatFormFieldControl,MatSelectModule,MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule,MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';



import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NearByOffersComponent } from './User/near-by-offers/near-by-offers.component';
import { OffersHereComponent } from './user/offers-here/offers-here.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    AdminComponent,
    UserComponent,
    NearByOffersComponent,
    OffersHereComponent,
    
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
    MatOptionModule,
    BrowserAnimationsModule,
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

    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSlideToggleModule,

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
