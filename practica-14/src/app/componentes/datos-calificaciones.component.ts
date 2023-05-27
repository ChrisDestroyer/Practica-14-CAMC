import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calificacion } from '../interface/calificacion';


@Component({
  selector: 'app-datos-calificaciones',
  templateUrl: './datos-calificaciones.component.html',
  styleUrls: ['./datos-calificaciones.component.scss'],
})
export class DatosCalificacionesComponent  implements OnInit {

  @Input() calificacionesList:Calificacion[] =[];
  @Output() eliminar: any = new EventEmitter<Calificacion[]>();
  @Output() editar:  any = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

}
