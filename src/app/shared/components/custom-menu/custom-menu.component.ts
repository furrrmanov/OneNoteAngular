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

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  @Output() public onTrigger = new EventEmitter();
  @Input() public contextMenuPosition = { x: '0px', y: '0px' };
  @Output() public onClosed = new EventEmitter();
  @Input() public handleDeleteItem;
  @Input('isOpen') public set setOnTrigger(isOpen: boolean) {
    if (isOpen) {
      this.onTrigger.emit(this.contextMenu);
    }
  }

  constructor(private store$: Store) {}

  public closedMenu() {
    this.onClosed.emit();
  }

  public deleteItem(item) {
    this.handleDeleteItem(item);
  }

  ngOnInit() {}
}
