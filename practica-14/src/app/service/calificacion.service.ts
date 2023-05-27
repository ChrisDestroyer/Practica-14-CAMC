import { Injectable } from '@angular/core';
import { Calificacion } from '../interface/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private calificaciones: Calificacion[]= [];

  constructor() { }


  public agregarCalificacion(calificacion: Calificacion){
    if(this.calificaciones.length>0){
      calificacion.id = this.calificaciones.length + 1 ;
    } else {
      calificacion.id = 1;
    }
    this.calificaciones.push(calificacion);
  }

  public borrarCalificacion(id: number){
    this.calificaciones =
    this.calificaciones.filter((al=>al.id!=id));
  }

  public getCalificaciones(): Calificacion[]{
    return this.calificaciones;
  }

  public setCalificaciones(calificaciones: Calificacion[]){
    this.calificaciones = calificaciones;
  }

  public actualiza(calificacion: Calificacion): Calificacion[]{
    this.calificaciones.filter(
      (al)=>al.id==calificacion.id
    ).map(al=>{
      al.materia = calificacion.materia;
      al.calificacion = calificacion.calificacion;
    });
    return this.calificaciones;
  }
}
