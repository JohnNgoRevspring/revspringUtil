import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RemitService } from './remit.service';
import { ToastService, UserProfileService } from '../core';

@Component({
  moduleId: module.id,
  templateUrl: 'remit.component.html',
  providers: [RemitService]
})
export class RemitComponent implements OnDestroy {
  private remitSub: Subscription;

  constructor(
    private remitService: RemitService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userProfileService: UserProfileService) {
  }

  public get isLoggedIn() : boolean {
    return this.userProfileService.isLoggedIn;
  }

  remit() {
    this.remitSub = this.remitService
      .remit()
      .mergeMap(remitResult => this.route.queryParams)
      .map(qp => qp['redirectTo'])
      .subscribe(redirectTo => {
        this.toastService.activate(`Successfully logged in`);
        if (this.userProfileService.isLoggedIn) {
          let url = redirectTo ? [redirectTo] : [ '/dashboard' ];
          this.router.navigate(url);
        }
      });
  }

  logout() {
    this.remitService.logout();
    this.toastService.activate(`Successfully logged out`);
  }

  ngOnDestroy() {
    if (this.remitSub) {
      this.remitSub.unsubscribe();
    }
  }
}
