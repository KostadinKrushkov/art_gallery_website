import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'parse_timestamp'})
export class ParseTimestamp implements PipeTransform {
  transform(value: string):  string {
    if (!value)
      return value

    let value_as_array = value.split(' ').slice(0, 4)
    return value_as_array.join(' ');
  }
}

