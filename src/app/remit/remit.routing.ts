import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemitComponent } from './remit.component';

const routes: Routes = [
  { path: 'remit', component: RemitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemitRoutingModule { }

export const routedComponents = [RemitComponent];
