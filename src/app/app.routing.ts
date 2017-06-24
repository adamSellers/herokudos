/**
 * Created by asellers on 5/23/17.
 * File to handle routing in the application
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TodosComponent } from './pages/todos/todos.component';
import { AboutComponent } from './pages/about/about.component';

const appRoutes: Routes = [

  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
