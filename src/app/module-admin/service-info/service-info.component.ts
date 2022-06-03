import {Component, OnInit} from '@angular/core';
import {ResourceInfoService} from "../services/resource-info.service";

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  providers: [ResourceInfoService]
})
export class ServiceInfoComponent implements OnInit {

  public serviceInfo: string;

  constructor(private _resourceInfoService: ResourceInfoService) {
  }

  ngOnInit(): void {
    this._resourceInfoService.getServiceInfo().subscribe(data => this.serviceInfo = data)
  }


}
