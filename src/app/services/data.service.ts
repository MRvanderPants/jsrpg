import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  private emailAPI = 'https://www.mrvanderpants.com/email';

  constructor(
    private httpClient: HttpClient
  ) { }


  /**
   * Fetches all gender objects from the JSON file
   * @returns { Promise <any> }
   */
  public sendMail (formData: any): Promise <any> {

    return new Promise ((resolve, reject) => {
      this.httpClient.get(
        this.emailAPI)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }
}
