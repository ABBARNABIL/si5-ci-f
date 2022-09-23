import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item!: any;
  @Output() itemRemoved = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  modelChanged(item : any) {
    if (this.item.num === 0) {
     this.itemRemoved.emit(this.item)
    }
 }
}
