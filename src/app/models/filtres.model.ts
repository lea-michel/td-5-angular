import { IAeroport } from './aeroport.model';

export interface IFiltres {
  aeroport: IAeroport|null;
  debut: Date|null;
  fin: Date|null;
}
