import { Notebook } from './../../models/notebook.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Catalog } from '../../models/catalog.model'

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent {
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  @Output() public onTrigger = new EventEmitter();
  @Input() public contextMenuPosition = { x: '0px', y: '0px' };
  @Output() public onClosed = new EventEmitter();
  @Input() public handleDeleteItem: (item: Catalog | Notebook) => void;
  @Input('isOpen') public set setOnTrigger(isOpen: boolean) {
    if (isOpen) {
      this.onTrigger.emit(this.contextMenu);
    }
  }

  constructor(private store$: Store) {}

  public closedMenu(): void {
    this.onClosed.emit();
  }

  public deleteItem(item: Catalog | Notebook): void {
    this.handleDeleteItem(item);
  }
}
