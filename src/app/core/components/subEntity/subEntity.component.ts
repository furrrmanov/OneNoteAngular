import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { selectSubEntity } from 'src/app/store/entity/selector';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PopupCreateComponent } from 'src/app/shared/components/popup-create/popup-create.component';

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
  public currentId: string;
  public contextMenu: MatMenuTrigger;
  public currentContextItem: any;
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = { x: '0px', y: '0px' };
  public callbackForCreate: Function;

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.activeEntityId = params['id'];
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
    this.callbackForCreate = this.createItem.bind(this)
  }

  public getActiveLink(id: string): boolean {
    return id === this.currentId;
  }

  public selectSubEntity(id: string): void {
    this.currentId = id;
    this.router.navigate([], {
      queryParams: {
        subId: id,
      },
      queryParamsHandling: 'merge',
    });
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
    this.dialog.open(PopupCreateComponent, {
      width: '300px',
      data: { name: this.subEntityName, callback: this.callbackForCreate },
    });
  }

  public createItem(name: string, email: string): void {
    console.log('create subEntity logic');
  }

  public handleDeleteItem(): void {
    console.log('delete SubEntity logic');
  }
}
