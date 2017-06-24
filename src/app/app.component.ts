import {Component, OnInit} from '@angular/core';
import {TodoService} from './providers/todo.service';
import {Meta} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import { isNull } from 'util';


declare var SFIDWidget: any;
declare var SFIDWidget_loginHandler: any;
declare var SFIDWidget_logoutHandler: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {

  constructor(public meta: Meta) {


  }

  ngOnInit() {

    //meta tag stuff

    //check for meta tags and add if not exists
    if (isNull(this.meta.getTag('name="salesforce-logout-handler"'))) {
      this.meta.addTags(
        [
          {
            name: "salesforce-client-id",
            content: `${environment.clientId}`
          },
          {
            name: "salesforce-community",
            content: `${environment.communityURL}`
          },
          {
            name: "salesforce-redirect-uri",
            content: `${environment.redirectURL}`
          },
          {
            name: "salesforce-mode",
            content: "modal"
          },
          {
            name: "salesforce-forgot-password-enabled",
            content: "true"
          },
          {
            name: "self-register-enabled",
            content: "true"
          },
          {
            name: "salesforce-save-access-token",
            content: "true"
          },
          {
            name: "salesforce-target",
            content: "#salesforce-login"
          },
          {
            name: "salesforce-login-handler",
            content: "onLogin"
          },
          {
            name: "salesforce-logout-handler",
            content: "onLogout"
          }
        ], true);
    } else {

      console.log('meta tags exist!');
    }
  }

  onLogin(identity) {

    console.log(JSON.stringify(identity));

  }


  onLogout() {

    SFIDWidget.init();
  }


}


