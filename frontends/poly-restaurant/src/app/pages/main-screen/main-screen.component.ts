import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  activeItem!: SideBarItem;


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  updateMenu(item : SideBarItem){
    this.activeItem = item;
  }


}
