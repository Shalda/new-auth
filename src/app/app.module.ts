import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MsalBroadcastService,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import { FailedComponent } from './failed/failed.component';
import { AwsSignInComponent } from './aws-sign-in/aws-sign-in.component';
import {FormsModule} from '@angular/forms';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1; // Remove this line to use Angular Universal

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '87e8dac9-510d-4444-992d-65cf33cdcf65',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FailedComponent,
    AwsSignInComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MsalModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
