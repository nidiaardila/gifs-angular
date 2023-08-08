import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'hNPAPQsO6hBkzdp66BOZNBubZIZcoKOC';
  private _historial: string[] =[];
  public resultados : Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http:HttpClient) {
    //al iniciar la app nuevamente, obtener lo que tengo en el localStorage
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
    
   }

  buscarGifs (query: string = '') {
    //convertir en minuscula todo lo del input antes de guardar en el arreglo para no almacenar
    // la misma palabra si se escribe en mayuscula y en minuscula
    query = query.trim().toLowerCase();
    
    //evitar guardar palabras repetidas en el arreglo de historial (incluides)
    if(!this._historial.includes(query)){

      this._historial.unshift(query);

      //El arreglo del historial contenga maximo 10 busquedas
      this._historial = this._historial.splice(0,10);

      //almacenar la busqueda en el local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    console.log(this._historial);

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q',query)

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=hNPAPQsO6hBkzdp66BOZNBubZIZcoKOC&q=${ query }&limit=10`)
      .subscribe((resp) =>{
        console.log(resp.data);
        this.resultados = resp.data;

        //almacenar las imagenes de los resultados en el local storage
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      
      });

  }



  
}
