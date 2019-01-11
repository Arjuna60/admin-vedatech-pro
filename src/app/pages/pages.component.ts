import { Component, OnInit } from '@angular/core';

declare function init_plugins();
declare function init_mask();
// declare function modal_function();
// declare function footable_all_min();
// declare function bootstrap_select_min();
// declare function footable_init();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
    init_mask();
 //   modal_function();
    // footable_all_min();
    // bootstrap_select_min();
    // footable_init();


  }

}
