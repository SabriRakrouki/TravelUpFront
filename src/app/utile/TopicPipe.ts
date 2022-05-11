import { Pipe, PipeTransform } from '@angular/core';
import { Topic } from '../Models/Topic';

@Pipe({ name: 'Topic' })
export class TopicPipe implements PipeTransform {
    transform(value:Topic) {
        if(value==null){
            return "";
        }
      return `${value.nameTopic}`
    }




}