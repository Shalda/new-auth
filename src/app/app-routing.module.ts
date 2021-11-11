import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { FailedComponent } from './failed/failed.component';
import { AwsSignInComponent } from './aws-sign-in/aws-sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'aws',
    component: AwsSignInComponent,
  },
  {
    path: 'login-failed',
    component: FailedComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabled'
          : 'disabled', // Remove this line to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
