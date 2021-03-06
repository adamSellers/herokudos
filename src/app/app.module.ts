import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NglModule } from 'ng-lightning/ng-lightning';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodosComponent } from './components/todos/todos.component';
import { AboutComponent } from './components/about/about.component';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodosComponent,
    TodosComponent,
    AboutComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NglModule.forRoot({
      svgPath: '/css/icons'
    }),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
