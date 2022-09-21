import { Component, OnInit } from '@angular/core';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  activeItem!: SideBarItem;
  constructor() { }

  ngOnInit() {
  }

  updateMenu(item : SideBarItem){
    this.activeItem = item;
  }
}
