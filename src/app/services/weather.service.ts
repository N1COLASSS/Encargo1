import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  urlEndPoint = 'https://api.openweathermap.org/data/2.5/'

  constructor(private httpClient: HttpClient) { }

  getWeather(latitude: number, longitude: number): Promise<any> {
    return new Promise((resolve,reject) => {
      this.httpClient.get(`${this.urlEndPoint}weather?lat=${latitude}&lon=${longitude}&appid=${environment.openweather_api_key}&units=metric`)
      .subscribe({
        next: (respuesta) => resolve(respuesta),
        error:  (error) => reject(error),
        complete: () => console.log('Complete')
      })
    })
  }

  getLocation(): Promise<any> {
    return new Promise((resolve,reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lon:resp.coords.longitude, lat:resp.coords.latitude})
      })
    })
  }


}