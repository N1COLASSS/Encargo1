import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  pageTitle = 'Weather';
  image = 'weather.png';
  pageIcon = `../../assets/img/${this.image}`;

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap?: GoogleMap;
  markedId?:string = '';

  latitude:number=0;
  longitude:number=0;

  resultados:any = null;
  todayDate = new Date()


  constructor(private weatherService: WeatherService,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.getGeolocalizacion();
  }

  async getGeolocalizacion() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.weatherService.getWeather(this.latitude,this.longitude)
      .then((res) => {
        this.resultados = res;
        console.log(this.resultados)
      })
    })
  }

  async createMap(latitude:number,longitude:number){
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.googlemaps_api_key,
      config: {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 8,
      } 
    });
    this.addMarket(latitude,longitude)
  }

  async addMarket(latitude: number,longitude: number){
    this.markedId = await this.newMap?.addMarker({
      coordinate: {
        lat:latitude,
        lng:longitude,
      },
      draggable:false,
    });

  }
}