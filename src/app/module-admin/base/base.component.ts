import { Component } from '@angular/core';
import { AdminAppService } from '../admin-app.service';

@Component({
  selector: 'app-admin-base',
  template: ` <router-outlet></router-outlet> `,

  providers: [AdminAppService],
})
export class AdminBaseComponent {
  constructor() {}
}
