import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideBarItem } from './side-bar-item.model';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.css']
})
export class SideBarItemComponent implements OnInit {
  @Input()
  sideBarItem!: SideBarItem;

  @Output()
  newItemEvent = new EventEmitter<SideBarItem>();

  constructor() { }

  ngOnInit() {
  }

  selectItem() {
    this.newItemEvent.emit(this.sideBarItem);
  }

}
