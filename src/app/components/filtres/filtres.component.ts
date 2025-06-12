import { Component, EventEmitter, LOCALE_ID, Output, signal, ViewEncapsulation } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { AEROPORTS } from './../../constants/aeroport.constant';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IAeroport } from '../../models/aeroport.model';
import { ThreeDayRangeSelectionStrategy } from '../../date-adapter';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatCommonModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFiltres } from '../../models/filtres.model';


@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatCommonModule, CommonModule],
    providers: [
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: ThreeDayRangeSelectionStrategy,
        },
    ],
    encapsulation: ViewEncapsulation.None
})
export class FiltresComponent {

  /**
   * La liste des aéroports disponibles est une constante,
   * on n'utilise que les principaux aéroports français pour l'instant
   */
  aeroports: IAeroport[] = AEROPORTS;

  filters = signal<IFiltres>({
    aeroport:null,
    debut:null,
    fin:null
  });

  @Output() event = new EventEmitter<IFiltres>();

  protected airportSelected = signal<IAeroport|null>(null);
  protected startDateSelected = signal<Date | null>(null);
  protected endDateSelected = signal<Date | null>(null);

  onAirportSelected(airport: IAeroport) : void{
    this.airportSelected.set(airport);
    console.log(this.airportSelected())
}

onEndDateSelected(endDate: Date) { 
    this.endDateSelected.set(endDate) 
}
onStartDateSelected(startDate: Date) {
    this.startDateSelected.set(startDate)
}

onSubmitFilters(){
    this.filters.set({aeroport:this.airportSelected()!, debut: this.startDateSelected()!, fin: this.endDateSelected()!})
    this.event.emit(this.filters());
    console.log(this.filters)
}


  
}
