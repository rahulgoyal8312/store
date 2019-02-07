import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'summary'
})
export class SummaryPipe implements PipeTransform{
	transform(value: string,length?: number){
		if(length){
			return value.substr(0,length);
		}
		return value.substr(0,70);
	}
}