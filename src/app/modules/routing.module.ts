import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../core/components/login/login.component';
import { NotebookComponent } from '../core/components/notebook/notebook.component';
import { CatalogComponent } from '../core/components/catalog/catalog.component';
import {
  ROUT_FOR_HOME_PAGE,
  ROUT_FOR_LOGIN_PAGE,
  ROUT_FOR_CATALOG_PAGE,
} from '../core/constants';

const routes: Routes = [
  { path: ROUT_FOR_HOME_PAGE, component: NotebookComponent },
  {
    path: ROUT_FOR_CATALOG_PAGE,
    component: CatalogComponent,
  },
  { path: ROUT_FOR_LOGIN_PAGE, component: LoginComponent },
  { path: '**', redirectTo: ROUT_FOR_HOME_PAGE },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
