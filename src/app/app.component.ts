import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from './services/service.index';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 ngOnInit() {
  }

  constructor(
    public _ajustes: SettingsService ) {}

    // tslint:disable-next-line:use-life-cycle-interface

}
