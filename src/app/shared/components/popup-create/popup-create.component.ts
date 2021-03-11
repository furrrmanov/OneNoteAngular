import { FacadeService } from './../../../core/services/facade.service';
import { EntityComponent } from './../../../core/components/entity/entity.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-create',
  templateUrl: './popup-create.component.html',
  styleUrls: ['./popup-create.component.scss'],
})
export class PopupCreateComponent {
  name: string;
  userEmail: string;

  constructor(
    public dialogRef: MatDialogRef<EntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facade: FacadeService
  ) {
    this.facade
      .selectUserEmail()
      .subscribe((value: string) => (this.userEmail = value));
  }

  public confirmCreate(): void {
    this.data.callback(this.name, this.userEmail);
  }
}
