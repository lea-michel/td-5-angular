import { Component, Input, NgModule, signal } from '@angular/core';
import { Passager } from '../../models/passager.model';
import { PassagerComponent } from "../passager/passager.component";
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-liste-passagers',
    imports: [PassagerComponent, MatSlideToggle, FormsModule],
    templateUrl: './liste-passagers.component.html',
    styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent {

    @Input() passagers!: Passager[]

    showPhotos = signal<boolean>(false);

    toggleShowPhotos(event: MatSlideToggleChange) {
        this.showPhotos.set(event.checked); 
    }
   
}
