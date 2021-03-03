import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input('entity') public set setEntity(entity: any) {
    this.data = entity;
  }
  @Input() public entityName: string;
  public data: any;
  public currentId: string;
  public contextMenu: MatMenuTrigger;
  public currentContextItem: any;
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = { x: '0px', y: '0px' };
  public callbackForCreate: Function;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store$: Store
  ) {}

  ngOnInit() {
    this.callbackForCreate = this.createItem.bind(this);
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

  public getActiveLink(id: string): boolean {
    return id === this.currentId;
  }

  public selectEntity(id: string): void {
    this.currentId = id;
    this.router.navigate([], {
      queryParams: {
        id: id,
      },
      queryParamsHandling: 'merge',
    });
  }

  public handleAddEntity(): void {
    this.dialog.open(PopupCreateComponent, {
      width: '300px',
      data: { name: this.entityName, callback: this.callbackForCreate },
    });
  }

  public createItem(name: string, email: string): void {
    this.store$.dispatch(
      CreateEntityAction({
        data: {
          value: {
            name: name,
            owner: email,
            entity: this.entityName,
          },
          root: `/${this.entityName}`,
          path: `/create-${this.entityName}`,
        },
      })
    );
  }

  public handleDeleteItem(item): void {
    this.store$.dispatch(
      DeleteEntityAction({
        data: {
          collectionName: `/${item.entity}`,
          collectionRoot: `/${item.entity}/`,
          path: `/${item.entity}/delete-${item.entity}`,
          id: item.id,
        },
      })
    );
  }
}
