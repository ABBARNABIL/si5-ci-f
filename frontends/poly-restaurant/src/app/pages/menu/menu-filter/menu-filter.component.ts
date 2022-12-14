import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent implements OnInit {

  @Input() name: string = '';
  @Input() imgPath: string = '';

  constructor() { }

  ngOnInit() {
  }

}
