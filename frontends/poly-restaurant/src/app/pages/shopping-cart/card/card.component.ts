import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  panelOpenState = false;
  @Input() item!: any;
  @Output() itemRemoved = new EventEmitter();
  constructor() {
    console.log(this.item)
  }

  ngOnInit(): void {
  }
  modelChanged(item : any) {
    if (this.item.num === 0) {
     this.itemRemoved.emit(this.item)
    }
 }
}
