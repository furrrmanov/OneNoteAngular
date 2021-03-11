import { Notebook } from './../../../shared/models/notebook.model';
import { Catalog } from './../../../shared/models/catalog.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupCreateComponent } from 'src/app/shared/components/popup-create/popup-create.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import {
  CreateEntityAction,
  DeleteEntityAction,
} from 'src/app/store/entity/actions';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  @Input('entity') public set setEntity(entity: Notebook | Catalog) {
    this.data = entity;
  }
  @Input() public entityName: string;
  public data: Catalog | Notebook;
  public contextMenu: MatMenuTrigger;
  public currentContextItem: Catalog | Notebook;
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = { x: '0px', y: '0px' };
  public callbackForCreate: (name: string, email: string) => void;

  constructor(public dialog: MatDialog, private store$: Store) {}

  ngOnInit() {
    this.callbackForCreate = this.createItem.bind(this);
  }

  public onContextMenu(event: MouseEvent, item: Catalog | Notebook): void {
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

  public getPath(entityName: string): string {
    return `/${entityName}`;
  }

  public handleAddEntity(): void {
    this.dialog.open(PopupCreateComponent, {
      width: '300px',
      data: { name: this.entityName, callback: this.callbackForCreate },
    });
  }

  public createItem(name: string, email: string): void {
    const newItem = {
      data: {
        value: {
          name: name,
          owner: email,
          entity: this.entityName,
        },
      },
    };
    this.store$.dispatch(CreateEntityAction(newItem));
  }

  public handleDeleteItem(item: Catalog | Notebook): void {
    this.store$.dispatch(
      DeleteEntityAction({
        data: {
          entity: item.entity,
          id: item.id,
        },
      })
    );
  }
}
