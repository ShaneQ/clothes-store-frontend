import {Injectable, TemplateRef} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showStandard(value : string) {
    this.show(value, {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess(value : string) {
    this.show(value, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Success'
    });
  }
  showError(value : string) {
    this.show(value, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }
}
