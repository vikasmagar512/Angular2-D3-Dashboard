import {DatePipe} from '@angular/common';
import {PipeTransform} from '@angular/core';

export class Format implements PipeTransform {
  datePipe: DatePipe = new DatePipe('yMd');
  transform(input: any, args: any): any {
    if (input == null) return '';
    if(['chart'].indexOf(args)!==-1) return ''
    var format = '';
    var parsedFloat = 0;
    var k =''
    console.log('input is',input )
    console.log('args is',args )
    if(args ==='image'){
      k = input.split('alt="')[1].split('>')[0].split('"')[0]
    }
    if(args ==='link'){
      k = input.split('<a>')[1].split('</a>')[0]
    }
    var pipeArgs = args.split(':');
    for (var i = 0; i < pipeArgs.length; i++) {
      pipeArgs[i] = pipeArgs[i].trim(' ');
    }

    switch (pipeArgs[0].toLowerCase()) {
      case 'text':
        return input;
      case 'button':
        return "";
      case 'date':
        return this.getDate(input);
      case 'image':
        return k;
      case 'link':
        return k;
      case 'csv':
        if (input.length == 0)
          return "";
        if (input.length == 1)
          return input[0].text;
        let finalstr: string = "";
        for (let i = 0; i < input.length; i++) {
          finalstr = finalstr + input[i].text + ", ";
        }
        return finalstr.substring(0, finalstr.length - 2);
      default:
        return input;
    }
  }
  getTextFromImage(){

  }
  private getDate(date: string): any {
    return new Date(date).toLocaleDateString();
  }
}
