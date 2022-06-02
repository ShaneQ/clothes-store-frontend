import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppToastsComponent} from "./app-toasts/app-toasts.component";
import {ToastService} from "./toast.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppToastsComponent
  ],
  exports: [
    AppToastsComponent,
  ],
  providers: [
    ToastService
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class ModuleCommonModule {
  constructor(@Optional() @SkipSelf() parentModule?: ModuleCommonModule) {
    if (parentModule) {
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ModuleCommonModule> {
    return {
      ngModule: ModuleCommonModule,
      providers: [
        ToastService
      ]
    };
  }
}
