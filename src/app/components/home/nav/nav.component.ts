import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  sideToggled = false;

  constructor(private navService: NavService) {
  }

  ngOnInit(): void {
  }

  sideToggle(): void {
    this.sideToggled = !this.sideToggled;
  }

  sideToggleForceClose(): void {
    this.sideToggled = false;
  }
}
