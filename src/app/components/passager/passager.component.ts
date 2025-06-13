import { Component, Input } from '@angular/core';
import { Passager } from '../../models/passager.model';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-passager',
    standalone: true,
    imports: [MatIcon, NgClass, MatTooltipModule],
    templateUrl: './passager.component.html',
    styleUrls: ['./passager.component.scss']
})
export class PassagerComponent {
     @Input() passager!: Passager;

     @Input() showPhoto:boolean = false;

    checkExcesBagage(): boolean{
        if(this.passager.classeVol==="STANDARD"&&this.passager.nbBagagesSoute>1){
            return true
        }else if(this.passager.classeVol==="BUSINESS"&&this.passager.nbBagagesSoute>2){
            return true
        }else if(this.passager.classeVol==="PREMIUM"&&this.passager.nbBagagesSoute>3){
            return true
        }
        return false;
    }

}
