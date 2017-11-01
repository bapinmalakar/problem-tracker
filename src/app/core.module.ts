import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './shared/services/guard/user.service';

export class CoreModule {
  serviceList = [UserService];
  constructor() { }
}
