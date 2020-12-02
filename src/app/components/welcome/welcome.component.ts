import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  stepOneHtml: string = '<!DOCTYPE html>\n'
    + '<html lang="en">\n'
    + '  <head>\n'
    + '    <meta charset="utf-8" />\n'
    + '    <title>CodeDay JS Animations Workshop</title>\n'
    + '    <link rel="stylesheet" href="styles.css">\n'
    + '  </head>\n'
    + '  <body>\n'
    + '    <canvas id="canvas" width="480" height="320"></canvas>\n'
    + '    <!-- This script tag MUST come after the canvas tag in this format -->\n'
    + '    <script src="scripts.js"></script>\n'
    + '    <!-- We blame the order internet browsers load things for that -->\n'
    + '  </body>\n'
    + '</html>\n';

  stepOneJs: string = 'Simply create a file called scripts.js. Nothing to copy from here.';

  stepOneCss: string = 'canvas {\n  background: #eee; \n}';

  constructor(private router: Router) { }

  // eslint-disable-next-line class-methods-use-this
  ngOnInit(): void {
  }

  nextStep(): void {
    this.router.navigateByUrl('/stepOne');
  }
}
