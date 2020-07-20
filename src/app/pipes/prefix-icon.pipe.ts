import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prefixIcon' })
export class PrefixIconPipe implements PipeTransform {
  transform(icon: string): string {
    return `devicon-${icon}-plain`;
  }
}
