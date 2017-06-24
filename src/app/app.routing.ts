/**
 * Created by asellers on 5/23/17.
 * File to handle routing in the application
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TodosComponent } from './components/todos/todos.component';
import { AboutComponent } from './components/about/about.component';
import { CallbackComponent } from './components/callback/callback.component';


const appRoutes: Routes = [

  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
