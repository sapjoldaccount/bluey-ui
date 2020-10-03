import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private ngx: NGXLogger) {}

  logError(action?: string, functionName?: string): void {
    this.ngx.error(`An error has occurred while ${action} in ${functionName}`);
  }

  logDebug(message: string): void {
    this.ngx.debug(message);
  }
}
