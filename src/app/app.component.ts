import {Component, TemplateRef} from '@angular/core';
import { AppService } from './services/app.service';
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService, ToastService],
})
export class AppComponent {
  constructor(public toastService: ToastService) {}
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
