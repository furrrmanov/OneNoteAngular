import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/mainMenu/mainMenu.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { AppRoutingModule } from '../modules/routing.module'
import { EntityComponent } from './components/entity/entity.component';
import { SubEntityComponent } from './components/subEntity/subEntity.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, AppRoutingModule],
  declarations: [
    HeaderComponent,
    LoginComponent,
    NotebookComponent,
    MainMenuComponent,
    CatalogComponent,
    EntityComponent,
    SubEntityComponent
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    NotebookComponent,
    MainMenuComponent,
    CatalogComponent,
    EntityComponent,
    SubEntityComponent
  ],
})
export class CoreModule {}
