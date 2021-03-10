import { selectArticleList } from './../../../store/entity/selector/index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  public currentArticle: any = {};
  public articleList: any;
  public activeArticleId: string;
  public activeCatalogId: string;
  public form: FormGroup;
  private isKilled: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.isKilled)).subscribe((params) => {
      this.activeCatalogId = this.router.url.split('/')[2];
      this.activeArticleId = params.id;
      this.store$
        .pipe(select(selectArticleList(this.activeCatalogId)))
        .subscribe((data) => {
          this.articleList = data?.articleList;
          this.currentArticle = data?.articleList.find(
            (item) => item.id === this.activeArticleId
          );
          this.initFormGroup();
          console.log(this.currentArticle);
        });
    });
  }

  public ngOnDestroy() {
    this.isKilled.next(true);
    this.isKilled.complete();
  }

  public initFormGroup(): void {
    this.form = new FormGroup({
      articleName: new FormControl(
        this.currentArticle?.name,
        Validators.required
      ),
    });
  }
}
