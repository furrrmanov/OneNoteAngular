import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
 @Input() entity
  constructor() { }

  ngOnInit() {
    // console.log(this.entity)
  }

}
