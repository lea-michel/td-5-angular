import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-toolbar',
    imports: [MatToolbarModule, MatButtonModule],
    templateUrl: './toolbar.component.html',
    standalone: true,
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private _router: Router) { }

  toDecollages(): void {
    this._router.navigateByUrl(`/decollages`);
  }

  toAtterrissages(): void {
    console.log('Redirection vers atterrissages');
    this._router.navigateByUrl(`/atterrissages`);
  }

}
