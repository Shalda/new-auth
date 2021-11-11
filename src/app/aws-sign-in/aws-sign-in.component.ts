import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aws-sign-in',
  templateUrl: './aws-sign-in.component.html',
  styleUrls: ['./aws-sign-in.component.css'],
})
export class AwsSignInComponent implements OnInit {
  isLoading = false;
  // tslint:disable-next-line:variable-name
  email_address = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSignIn(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      const authenticationDetails = new AuthenticationDetails({
        Username: this.email_address,
        Password: this.password,
      });
      const poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId, // Your client id here
      };

      const userPool = new CognitoUserPool(poolData);
      const userData = { Username: this.email_address, Pool: userPool };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.router.navigate(['dashboard']);
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
}
