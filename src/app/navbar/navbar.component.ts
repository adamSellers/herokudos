import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Users } from '../models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Users = new Users;


  constructor(public meta: Meta) {


    //build the meta tags required for Salesforce Embedded Login
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
          content: "onlogin"
        },
        {
          name: "salesforce-logout-handler",
          content: "onlogout"
        }
      ], true);

  }

  ngOnInit() {
  }

  onLogin(identity) {
    console.log('navbar component did this bit - ' + JSON.stringify(identity));
  }

  onLogout() {
    console.log('navbar component logout button');
  }

}
