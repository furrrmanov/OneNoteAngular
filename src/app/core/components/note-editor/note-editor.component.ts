import { Notebook, NoteList } from './../../../shared/models/notebook.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EditorChangeContent,
  EditorChangeSelection,
  QuillEditorComponent,
} from 'ngx-quill';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectNoteList } from 'src/app/store/entity/selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpdateSubEntityAction } from 'src/app/store/entity/actions';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  public editorText: string;
  public activeNoteId: string;
  public noteList: any;
  public currentNote: any = {};
  public activeNotebookId: string;
  public form: FormGroup;
  public isChanged: boolean = true;
  private isKilled: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.isKilled)).subscribe((params) => {
      this.activeNotebookId = this.router.url.split('/')[2];
      this.activeNoteId = params.id;
      this.store$
        .pipe(select(selectNoteList(this.activeNotebookId)))
        .subscribe((data) => {
          this.noteList = data?.noteList;
          this.currentNote = data?.noteList.find(
            (item) => item.id === this.activeNoteId
          );
          this.editorText = this.currentNote?.text;
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
      noteName: new FormControl(this.currentNote?.name, Validators.required),
    });

    this.form.valueChanges.subscribe((data) => {
      this.isChanged = data.noteName.trim() === this.currentNote?.name.trim();
    });
  }

  public changeEditor(event: string) {
    this.isChanged = event.trim() === this.currentNote?.text;
  }

  public handleSave() {
    const chanchedNote = {
      ...this.currentNote,
      name: this.form.value.noteName,
      text: this.editorText,
    };
    const updatedNoteList = this.updatedItemFromNoteList(
      this.noteList,
      chanchedNote
    );

    this.store$.dispatch(
      UpdateSubEntityAction({
        data: {
          value: {
            noteList: updatedNoteList,
            id: this.activeNotebookId,
            collectionName: 'note',
            entity: 'notebook',
          },
        },
      })
    );

    this.isChanged = true;
  }

  public updatedItemFromNoteList(
    data: Notebook[],
    changedItem: any
  ): Notebook[] {
    const parseData = data.map((item) => item);
    const index = data
      .map((item) => item)
      .findIndex((note) => note.id === changedItem.id);
    parseData.splice(index, 1, changedItem);
    return parseData;
  }
}
