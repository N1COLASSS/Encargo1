import { Component, OnInit } from '@angular/core';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

  pageTitle = 'Conversor';
  image = 'conversor.png';
  pageIcon = `../../assets/img/${this.image}`

  listarSymbols: any = [];

  UF: any;
  Dolar: any;
  Euro: any ;
  CLP: number = 0;
  respuestaCarga: boolean=false;
  conversion: number = 0;
  
  getListadoSymbols: any;


  constructor(private conversorService: ConversorService) { }

  ngOnInit(): void {
    this.cargarUf();
  }

  async cargarUf(cargarmasUf:boolean = false, event?:any) {
    this.conversorService.getListadoSymbols()
    .then(respuesta => {
      this.getListadoSymbols= respuesta;
      this.UF = respuesta.uf;
      this.Dolar = respuesta.dolar;
      this.Euro = respuesta.euro;
      
      this.respuestaCarga = true;
    },
    (err) => {
    });
  }
  ConvertirEuro() {
    
    this.conversion = this.CLP/parseFloat(this.Euro.valor)
    
  }
  ConvertirDolar() {
    
    this.conversion = this.CLP/parseFloat(this.Dolar.valor)

  }
  limpiarCampo(){
    this.conversion = 0;
    this.CLP = 0;
  }

}

