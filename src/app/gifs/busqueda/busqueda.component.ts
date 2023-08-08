import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){

  }

  buscar( termino : string){
    // console.log(this.txtBuscar);
    const valor = this.txtBuscar.nativeElement.value;

    //SI el input esta vacio no enviar nada al historial
    if(valor.trim().length===0){
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
