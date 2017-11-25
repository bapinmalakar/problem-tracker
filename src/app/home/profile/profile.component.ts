import { UserAuthService } from './../../shared/services/userAuth.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { CookieService } from './../../shared/cookies.service';
import { Component, OnInit } from '@angular/core';
import { UserModelService } from '../../shared/services/user.service';
import filestack from 'filestack-js';

declare var window: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  client: any;
  loadingImg: any = false;
  userDetails: any;
  constructor(public _cookieService: CookieService,
    public _userModelService: UserModelService,
    public _navigate: Router,
    public _userAuthService: UserAuthService) {
  }

  ngOnInit() {
    this.client = filestack.init(environment.filestack_api);
  }

  uploadImage() {
    this.loadingImg = true;
    this.client.pick({
      maxFiles: 1,
      minFiles: 1,
      accept: 'image/*',
      fromSources: ['local_file_system', 'imagesearch', 'facebook', 'gmail', 'instagram', 'url', 'github', 'webcam', 'googledrive'],
      lang: 'en',
      hideWhenUploading: true,
      disableTransformer: false,
      rejectOnCancel: true
    })
      .then((res) => {
        const url = res.filesUploaded[0].url;
        this._userAuthService.uploadImage(this._userModelService.getUser()._id, { url: url })
          .subscribe(result => {
            this._userModelService.getUser().profile_image = url;
            this.loadingImg = false;
          }, err => {
            console.log('Image upload error: ', err);
            window.errorToast('Some system error occure! Try again');
            this.loadingImg = false;
          });
      }, err => {
        window.errorToast('Some system error occure! Try again');
        this.loadingImg = false;
      });
  }
}
