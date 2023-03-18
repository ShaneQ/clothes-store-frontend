import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-join-thanks',
  templateUrl: './join-thanks.component.html',
  styleUrls: ['./join-thanks.component.scss']
})
export class JoinThanksComponent implements OnInit {

  constructor(    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log("MODAL INIT")
  }

  closeModal() {

  }
}
