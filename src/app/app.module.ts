import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxStripeModule} from "ngx-stripe";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PLUTO_ID} from "./pluto.service";
import {DialogComponent} from "./dialog.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EstateInterceptorService} from "./estate-interceptor.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    NgxStripeModule.forRoot(
      'pk_test_51Ii5RpH2XTJohkGafOSn3aoFFDjfCE4G9jmW48Byd8OS0u2707YHusT5PojHOwWAys9HbvNylw7qDk0KkMZomdG600TJYNYj20'
    ),
    MatCardModule,
    FormsModule,
    InputTextModule,
  ],
  exports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EstateInterceptorService,
      multi: true
    },
    {
      provide: PLUTO_ID,
      useValue: '449f8516-791a-49ab-a09d-50f79a0678b6',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
