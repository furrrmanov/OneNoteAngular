import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DataMapperService } from './../../services/dataMapper.service';
import { AuthService } from './../../services/authentication.service';
import { Profile, ProfileService } from './../../services/profile.service';
import { setUser } from './../../../store/user/actions/index';
import { UserState } from '../../../shared/models/user.model';
import { setProfile } from 'src/app/store/profile/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private store: Store,
    private router: Router,
    private mapper: DataMapperService
  ) {}

  ngOnInit() {}

  public checkUserProfile(userProfile: Profile, userInfo: UserState) {
    if (userProfile) {
      this.store.dispatch(setProfile({ userProfile: userProfile }));
      localStorage.setItem('profile', JSON.stringify(userProfile));
    } else {
      this.profileService.createUserProfile(userInfo.email).subscribe();
      this.store.dispatch(
        setProfile({ userProfile: { owner: userInfo.email } })
      );
    }
  }

  public onSubmit() {
    this.authService
      .login(this.authForm.value)
      .subscribe((userInfo: UserState) => {
        this.store.dispatch(setUser({ userInfo: userInfo }));

        this.profileService.checkUserProfile().subscribe((response) => {
          const userProfile = this.mapper
            .transformDataList(response)
            .find((item) => item.owner === userInfo.email);
          console.log(typeof userProfile);
          console.log('response', response);

          this.checkUserProfile(userProfile, userInfo);
        });

        localStorage.setItem('user', JSON.stringify(userInfo));
        this.router.navigate(['']);
      });
  }
}
