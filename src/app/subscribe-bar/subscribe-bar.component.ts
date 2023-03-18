import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {JoinThanksComponent} from "../modal/join-thanks/join-thanks.component";

@Component({
  selector: 'app-subscribe-bar',
  templateUrl: './subscribe-bar.component.html',
  styleUrls: ['./subscribe-bar.component.scss']
})
export class SubscribeBarComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(){
    console.log("CLICKED BUTTON")
    this.modalService.open(JoinThanksComponent)
  }

}
