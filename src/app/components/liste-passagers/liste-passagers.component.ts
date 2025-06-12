import { Component, Input } from '@angular/core';
import { Passager } from '../../models/passager.model';
import { PassagerComponent } from "../passager/passager.component";

@Component({
    selector: 'app-liste-passagers',
    imports: [PassagerComponent],
    templateUrl: './liste-passagers.component.html',
    styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent {
    @Input() passagers!: Passager[]

}
