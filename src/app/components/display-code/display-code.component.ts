import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-code',
  templateUrl: './display-code.component.html',
  styleUrls: ['./display-code.component.scss'],
})
export class DisplayCodeComponent {
  @Input()
  outputHtml: string;

  @Input()
  outputJs: string;

  @Input()
  outputCss: string;
}
