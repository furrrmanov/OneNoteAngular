import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { CustomMenuComponent } from './../shared/components/custom-menu/custom-menu.component';
import { PopupCreateComponent } from './../shared/components/popup-create/popup-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/mainMenu.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { AppRoutingModule } from '../modules/routing.module';
import { EntityComponent } from './components/entity/entity.component';
import { SubEntityComponent } from './components/subEntity/subEntity.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    LoginComponent,
    NotebookComponent,
    MainMenuComponent,
    CatalogComponent,
    EntityComponent,
    SubEntityComponent,
    PopupCreateComponent,
    CustomMenuComponent,
    NoteEditorComponent,
    ArticleEditorComponent
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    NotebookComponent,
    MainMenuComponent,
    CatalogComponent,
    EntityComponent,
    SubEntityComponent,
    PopupCreateComponent,
    CustomMenuComponent,
    NoteEditorComponent,
    ArticleEditorComponent
  ],
})
export class CoreModule {}
