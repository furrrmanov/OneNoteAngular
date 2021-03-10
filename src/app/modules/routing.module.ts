import { ArticleEditorComponent } from './../core/components/article-editor/article-editor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../core/components/login/login.component';
import { NotebookComponent } from '../core/components/notebook/notebook.component';
import { CatalogComponent } from '../core/components/catalog/catalog.component';
import {
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  CATALOG_PAGE_PATH,
} from '../core/constants';
import { SubEntityComponent } from '../core/components/subEntity/subEntity.component';
import { NoteEditorComponent } from '../core/components/note-editor/note-editor.component';

const routes: Routes = [
  { path: HOME_PAGE_PATH, component: NotebookComponent },
  {
    path: `${HOME_PAGE_PATH}/:id`,
    component: NotebookComponent,
    children: [
      { path: 'note', component: SubEntityComponent },
      { path: 'note/:id', component: NoteEditorComponent },
    ],
  },
  {
    path: CATALOG_PAGE_PATH,
    component: CatalogComponent,
  },
  {
    path: `${CATALOG_PAGE_PATH}/:id`,
    component: CatalogComponent,
    children: [
      { path: 'article', component: SubEntityComponent },
      { path: 'article/:id', component: ArticleEditorComponent },
    ],
  },
  { path: LOGIN_PAGE_PATH, component: LoginComponent },
  { path: '**', redirectTo: HOME_PAGE_PATH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
