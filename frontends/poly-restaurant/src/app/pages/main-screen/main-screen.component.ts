import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusService } from 'src/app/services/status.service';
import { SideBarItem } from '../side-bar/side-bar-item/side-bar-item.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  activeItem!: SideBarItem;
  isStarted = this.statusService.isStarted;

  constructor(
    private statusService : StatusService
  ) {}

  ngOnInit() {
  }

  updateMenu(item : SideBarItem){
    this.activeItem = item;
  }

  onStart() {
    this.statusService.isStarted.next(true);
    this.isStarted = this.statusService.isStarted;
  }

}
