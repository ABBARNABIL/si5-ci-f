import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { MenuComponent } from './pages/menu/menu.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { SideBarItemComponent } from './pages/side-bar/side-bar-item/side-bar-item.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { TablesDialogueComponent } from './pages/tables-dialogue/tables-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShowTableComponent } from './pages/tables-dialogue/show-table/show-table.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BillDialogueComponent } from './pages/bill-dialogue/bill-dialogue.component';
<<<<<<< HEAD
import { TrackingComponent } from './pages/tracking/tracking.component';
import {MatTableModule} from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ControlOrdersComponent } from './pages/control-orders/control-orders.component';
=======
import { MenuItemDialogComponent } from './pages/menu/menu-item/menu-item-dialog/menu-item-dialog.component';
import { FormsModule } from '@angular/forms';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';

>>>>>>> a3f41bbbf1b9503656a72b8f07a94b60a06e6d46


const routes: Routes = [
  {  path: 'track-order', component: TrackingComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    TopBarComponent,
    SideBarComponent,
    MenuComponent,
    MenuItemComponent,
    SideBarItemComponent,
    TablesDialogueComponent,
    ShowTableComponent,
    ShoppingCartComponent,
    BillDialogueComponent,
<<<<<<< HEAD
    TrackingComponent,
    ControlOrdersComponent,

=======
    MenuItemDialogComponent,
    ViewOrderComponent,
>>>>>>> a3f41bbbf1b9503656a72b8f07a94b60a06e6d46
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatExpansionModule,
<<<<<<< HEAD
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes)
=======
    FormsModule,
    MatTableModule,
    MatIconModule
>>>>>>> a3f41bbbf1b9503656a72b8f07a94b60a06e6d46
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MenuItemDialogComponent]
})

export class AppModule { }
