import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from './login.service';
import { SpinnerService, UserProfileService } from '../shared';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy, OnInit {
  message: string;

  private redirectTo: any[];
  private routerQueryParamSub: Subscription;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private userProfileService: UserProfileService) {
    this.setMessage();
  }

  public get isLoggedIn() : boolean {
    return this.userProfileService.isLoggedIn;
  }

  login() {
    this.spinnerService.show();
    this.message = 'Trying to log in ...';

    this.loginService.login().subscribe(() => {
      this.setMessage();
      if (this.userProfileService.isLoggedIn) {
        let url = this.redirectTo || [ '/dashboard' ];
        this.router.navigate(url);
      }
    });
  }

  logout() {
    this.spinnerService.show();
    this.loginService.logout();
    this.setMessage();
  }

  ngOnDestroy() {
    this.routerQueryParamSub.unsubscribe();
  }

  ngOnInit() {
    // Could use a snapshot here, as long as the parameters do not change.
    // This may happen when a component is re-used.
    // this.redirectTo = [this.router.routerState.snapshot.queryParams.redirectTo];
    this.routerQueryParamSub = this.router.routerState.queryParams
      .subscribe(qp => this.redirectTo = [qp['redirectTo']]);
  }

  private setMessage() {
    this.message = 'Logged ' + (this.userProfileService.isLoggedIn ? 'in' : 'out');
    this.spinnerService.hide();
  }
}
