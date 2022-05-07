import { Pipe, PipeTransform } from '@angular/core';
import { LocationModel } from '../Models/LocationModel';

@Pipe({ name: 'Location' })
export class LocationPipe implements PipeTransform {
    transform(value:LocationModel) {
        if(value==null){
            return "";
        }
      return `${value.country},${value.state},${value.city}`
    }




}