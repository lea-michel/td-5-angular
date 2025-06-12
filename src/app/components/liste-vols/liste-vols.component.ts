import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { VolComponent } from "../vol/vol.component";

@Component({
    selector: 'app-liste-vols',
    imports: [VolComponent],
    templateUrl: './liste-vols.component.html',
    styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent {
    @Input() vols!: Vol[]

    @Input() type!: 'decollages' | 'atterrissages';

    @Output() selectedVol = new EventEmitter<Vol>();

  onVolSelected(vol: Vol) {
    this.selectedVol.emit(vol);
  }

  ngOnInit() {
    console.log('Type reçu dans listeVols:', this.type);
  }
}
