import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'view-order', component: ViewOrderComponent }
 // {  path: 'my-component', component: MyComponentComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
