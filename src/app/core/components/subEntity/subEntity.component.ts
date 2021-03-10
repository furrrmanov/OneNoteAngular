import {
  CreateSubEntityAction,
  DeleteSubEntityAction,
} from './../../../store/entity/actions/index';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { selectSubEntity } from 'src/app/store/entity/selector';
import { MatMenuTrigger } from '@angular/material/menu';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-subEntity',
  templateUrl: './subEntity.component.html',
  styleUrls: ['./subEntity.component.scss'],
})
export class SubEntityComponent implements OnInit {
  @Input() public entityName: string;
  @Input() public subEntityName: string;
  public activeEntityId: string;
  public subEntityList: any;
  public contextMenu: MatMenuTrigger;
  public currentContextItem: any;
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = { x: '0px', y: '0px' };
  public handleDeleteItem: () => void;
  private isKilled: Subject<boolean> = new Subject<boolean>();

  constructor(private store$: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.isKilled)).subscribe((params) => {
      this.activeEntityId = params.id;
      this.store$
        .pipe(
          select(
            selectSubEntity(
              this.entityName,
              this.subEntityName,
              this.activeEntityId
            )
          )
        )
        .subscribe((data) => (this.subEntityList = data));
    });
    this.handleDeleteItem = this.deleteItem.bind(this);
  }

  ngOnDestroy() {
    this.isKilled.next(true);
    this.isKilled.complete();
  }

  public getPath(id: string): string[] {
    return [
      `/${this.entityName}/${this.activeEntityId}/${this.subEntityName}/${id}`,
    ];
  }

  public onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuIsOpen = true;
    this.currentContextItem = item;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
  }

  public onTriggerContextMenu(event: MatMenuTrigger): void {
    this.contextMenu = event;
    this.contextMenu.menuData = { item: this.currentContextItem };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  public onClosedContextMenu(): void {
    this.contextMenuIsOpen = false;
  }

  public handleAddSubEntity(): void {
    this.store$.dispatch(
      CreateSubEntityAction({
        data: {
          value: {
            entity: this.entityName,
            id: this.activeEntityId,
            collectionName: this.subEntityName,
            subEntityList: this.subEntityList,
          },
        },
      })
    );
  }

  public deleteItem(item): void {
    this.store$.dispatch(
      DeleteSubEntityAction({
        data: {
          value: {
            item,
            entity: this.entityName,
            id: this.activeEntityId,
            collectionName: this.subEntityName,
            subEntityList: this.subEntityList,
          },
        },
      })
    );
  }
}
