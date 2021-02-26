import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
 @Input('entity') public set setEntity(entity: any) {
   this.data = entity?.catalog || entity?.notebook
 }
 public data: any
  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
