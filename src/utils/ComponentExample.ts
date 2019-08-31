import { ReactElement } from 'react';

export class ComponentExample {
  public readonly name: string;
  public readonly code: ReactElement<any>;
  constructor(name: string, code: ReactElement<any>) {
    this.name = name;
    this.code = code;
  }
}
