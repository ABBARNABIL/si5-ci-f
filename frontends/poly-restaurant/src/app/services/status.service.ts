import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ThanksForBuyingComponent } from '../pages/thanks-for-buying/thanks-for-buying.component';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  isStarted : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private router : Router
  ) { }

  changeStatus() {
    this.isStarted.next(!this.isStarted.value);
  }

  async openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    while(this.cartService.trackingId == ""){
      await new Promise(r => setTimeout(r, 100));
    }
    dialogConfig.data = {
      command: this.cartService.trackingId
    };

    this.cartService.trackingId = '';

    this.dialog.open(ThanksForBuyingComponent, dialogConfig);
    await new Promise(r => setTimeout(r, 10000));
    this.dialog.closeAll();
    this.isStarted.next(false);
    this.router.navigate(['/']);
  }

}
