import { Catalog, ArticleList } from './../../../shared/models/catalog.model';
import { selectArticleList } from './../../../store/entity/selector/index';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validate } from 'uuid';
import { UpdateSubEntityAction } from 'src/app/store/entity/actions';
import { SubEntityService } from '../../services/sub-entity.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  public currentArticle: ArticleList;
  public articleList: ArticleList[];
  public imgList = [];
  public activeArticleId: string;
  public activeCatalogId: string;
  public fileName: string = '';
  public form: FormGroup;
  private isKilled: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
    private fb: FormBuilder,
    private subEntityService: SubEntityService
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
            (item: ArticleList) => item.id === this.activeArticleId
          );
          this.imgList = this.currentArticle?.imgList || [];
          this.initFormGroup();
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
      articleDescription: new FormControl(this.currentArticle?.description),

      characteristic: this.fb.array([], Validators.required),
    });

    if (this.currentArticle?.characteristicList) {
      this.currentArticle?.characteristicList.forEach((item) => {
        this.characteristic().push(this.fb.group(item));
      });
    }
  }

  public uploadFile(event: any): void {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    this.subEntityService
      .uploadFileInStorage(formData)
      .pipe(takeUntil(this.isKilled))
      .subscribe((data) => {
        if (data) {
          this.imgList.push(data);
        }
      });
  }

  public handleDeleteImage(indexToDelete: number, name: string): void {
    this.imgList = this.imgList.filter(
      (image, index) => index !== indexToDelete
    );
    this.subEntityService.deleteFileInStorage(name).subscribe();
  }

  characteristic(): FormArray {
    return this.form.get('characteristic') as FormArray;
  }

  newCharacteristic(): FormGroup {
    return this.fb.group({
      characteristic: '',
      value: '',
    });
  }

  addCharacteristic(): void {
    this.characteristic().push(this.newCharacteristic());
  }

  removeCharacteristic(i: number): void {
    this.characteristic().removeAt(i);
  }

  public onSubmit(): void {
    const chanchedArticle = {
      ...this.currentArticle,
      name: this.form.value.articleName,
      description: this.form.value.articleDescription,
      characteristicList: this.form.value.characteristic,
      imgList: this.imgList,
    };
    const updatedArticleList = this.updatedItemFromNoteList(
      this.articleList,
      chanchedArticle
    );

    this.store$.dispatch(
      UpdateSubEntityAction({
        data: {
          value: {
            noteList: updatedArticleList,
            id: this.activeCatalogId,
            collectionName: 'article',
            entity: 'catalog',
          },
        },
      })
    );
  }

  public updatedItemFromNoteList(
    data: ArticleList[],
    changedItem: ArticleList
  ): ArticleList[] {
    const parseData = [...data];
    const index = data
      .map((item) => item)
      .findIndex((article) => article.id === changedItem.id);
    parseData.splice(index, 1, changedItem);
    return parseData;
  }
}
