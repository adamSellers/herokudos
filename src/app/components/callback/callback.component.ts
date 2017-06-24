import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';


declare var SFIDWidget: any;
declare var SFIDWidget_loginHandler: any;
declare var SFIDWidget_logoutHandler: any;


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(public meta:Meta) { }

  ngOnInit() {

    //set the meta tags on the page.
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
          name: "salesforce-mode",
          content: "modal"
        },
        {
          name: "save-access-token",
          content: "true"
        },
        {
          name: "salesforce-allowed-domains",
          content: "localhost:3000"
        },
        {
          name: "salesforce-redirect-uri",
          content: `${environment.redirectURL}`
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

  }

}
