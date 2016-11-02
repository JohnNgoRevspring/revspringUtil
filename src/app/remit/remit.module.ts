import { NgModule } from '@angular/core';

import { RemitRoutingModule, routedComponents } from './remit.routing';
import { SharedModule } from '../shared/shared.module';
import { RemitNavComponent } from './remitNav.component'

@NgModule({
  imports: [RemitRoutingModule, SharedModule],
  declarations: [routedComponents, RemitNavComponent],
})
export class RemitModule { }
