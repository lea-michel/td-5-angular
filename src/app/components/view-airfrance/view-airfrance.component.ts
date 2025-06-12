import { Component, computed, signal } from '@angular/core';
import { FiltresComponent } from '../filtres/filtres.component';
import { ListeVolsComponent } from '../liste-vols/liste-vols.component';
import { ListePassagersComponent } from '../liste-passagers/liste-passagers.component';
import { IFiltres } from '../../models/filtres.model';
import { VolService } from '../../services/vol.service';
import { Vol } from '../../models/vol.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { PassagerService } from '../../services/passager.service';
import { Passager } from '../../models/passager.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-view-airfrance',
    imports: [FiltresComponent, ListeVolsComponent, ListePassagersComponent],
    templateUrl: './view-airfrance.component.html',
    styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent {
    type= signal<'decollages'|'atterrissages'>('decollages');
    computedType = computed(() => this.type());
    
    constructor(
        private volService:VolService, 
        private passengerService:PassagerService,
        private _router: Router,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void{

        this.route.paramMap.subscribe(params => {
            const typeParam = params.get('type');
            if (typeParam === 'decollages' || typeParam === 'atterrissages') {
                this.type.set(typeParam);
                if (this.areFiltersFilled()) {
                    this.onFiltersSubmitted(this.filters());
                }
                
            }
            console.log('Type mis à jour :', this.type);
        });

    }

    filters = signal<IFiltres>(
        {
            aeroport:null,
            debut:null,
            fin:null
        }
    );
    
    vols = signal<Vol[]>([]);

    passengers = signal<Passager[]>([])
  
    onFiltersSubmitted(filters: IFiltres) {
        this.filters.set(filters);
        console.log("parent aeroport"+ this.filters().aeroport?.nom)

        if(this.type()==='decollages'){
            this.volService.getVolsDepart(
                this.filters().aeroport!.icao,
                Math.floor(this.filters().debut!.getTime() / 1000),
                Math.floor(this.filters().fin!.getTime() / 1000)
            ).subscribe((vols)=>{
                this.vols.set(vols);
            });
        }else if (this.type()==='atterrissages'){
            this.volService.getVolsArrivee(
                this.filters().aeroport!.icao,
                Math.floor(this.filters().debut!.getTime() / 1000),
                Math.floor(this.filters().fin!.getTime() / 1000)
            ).subscribe((vols)=>{
                this.vols.set(vols);
            });
        }

        
    
    }

    volSelected!:Vol;

    setVolSelected(vol: Vol) {
        this.volSelected=vol;
        console.log(vol.icao)
        this.passengerService.getPassengers(this.volSelected.icao).subscribe((passengers)=>{
            this.passengers.set(passengers);
        })
    }

    areFiltersFilled(): boolean {
        const filtersValue = this.filters();
        return filtersValue.aeroport !== null && filtersValue.debut !== null && filtersValue.fin !== null;
    }
}
