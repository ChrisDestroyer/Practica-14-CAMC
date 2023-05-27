import { Component, OnInit } from '@angular/core';
import { Calificacion } from '../interface/calificacion';
import { CalificacionService } from '../service/calificacion.service';


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {

  calificaciones: Calificacion[]=[];
  materia: string ='';
  calificacion: string = '';
  resultado: string = '';
  estado: string = '';
  idActualizar: any|number = 0;
  error: boolean = false;

  constructor(private CalificacionService: CalificacionService) { }

  ngOnInit() {
    this.CalificacionService.setCalificaciones([
      {id:1, materia: 'Calculo Diferencial', calificacion: '20', resultado:'Reprobado'},
      {id:2, materia: 'Lab de Aplicaciones Moviles', calificacion: '100', resultado:'Aprobado'}
    ]);

    this.calificaciones = this.CalificacionService.getCalificaciones();
    this.estado ='guardar';
  }

  public guardar(){
    if((Number(this.calificacion)<0 || Number(this.calificacion)>100)){
      this.error = true;
      return;
    }
    if((this.materia == undefined || this.materia == '' ) ||
      (this.calificacion == undefined || this.calificacion == '') ||
      (this.resultado == undefined || this.resultado == '') ) {
      this.error = true;
      return;
    }
    let calificacion: Calificacion={
      materia: this.materia,
      calificacion: this.calificacion,
      resultado: this.resultado
    };
    if (this.estado ==='actualizar'){
      calificacion.id = this.idActualizar;
      this.calificaciones = this.CalificacionService.actualiza(calificacion);
    }
    if(this.estado === 'guardar'){
      this.CalificacionService.agregarCalificacion(calificacion);
      this.calificaciones = this.CalificacionService.getCalificaciones();
    }
    this.cancelar();
  }

  public cancelar(){
    this.estado = 'guardar';
    this.materia = '';
    this.calificacion = '';
    this.resultado = '';
    this.error = false;
  }

  public eliminar(id:number){
    this.CalificacionService.borrarCalificacion(id);
    this.calificaciones = this.CalificacionService.getCalificaciones();
  }

  public editar(calificacion:Calificacion){
    this.estado = 'actualizar';
    this.materia = calificacion.materia;
    this.calificacion = calificacion.calificacion;
    this.resultado = calificacion.resultado;
    this.idActualizar = calificacion.id;
  }
}
