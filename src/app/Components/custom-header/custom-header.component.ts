import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {
  @Input('HeaderTitle') title;
  @Input('notification') notification;
  @Input('icon') icon;
  @Input('SearchInput') searchInput;
  // @Output() onPressEvent = new EventEmitter();S
  @Output() HeaderBackClick = new EventEmitter();

  @Output() Searching = new EventEmitter();
  @Output() headbackk = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  HeaderBackPressEventfunc() {
    this.HeaderBackClick.emit();
  }

  Searchh() {
    this.Searching.emit();
  }
  headback() {
    this.headbackk.emit();
  }
}
