import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input()
  activeItem! : SideBarItem;

  menu : Array<MenuItem> = [];
  constructor(
    private menuService: MenuService,public dialog: MatDialog
  ) {}


  ngOnInit(): void {
  }


  ngOnChanges() {
    this.menu = [];
    this.getTheFullMenu();
  }


  getTheFullMenu() {
    this.menuService.getTheFullMenu().subscribe(data => {
      this.menu = data;
      this.menu = this.menu.filter(item => item.category === this.activeItem.category);
      console.log(this.menu);
    });
  }

  openTables() {
    const dialogRef = this.dialog.open(TablesDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
