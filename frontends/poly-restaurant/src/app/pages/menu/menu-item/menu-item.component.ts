import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from '../../../services/cart.service';
import { MenuItemDialogComponent } from './menu-item-dialog/menu-item-dialog.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menuItem!: MenuItem;
  constructor(private cartService : CartService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  selectItem(){
    this.openDialog();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      menuItem: this.menuItem
    };

    this.dialog.open(MenuItemDialogComponent, dialogConfig);
  }

}
