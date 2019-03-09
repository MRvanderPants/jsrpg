import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  private emailAPI = 'https://www.mrvanderpants.com/email.php';

  constructor(
    private httpClient: HttpClient
  ) { }


  /**
   * Fetches all gender objects from the JSON file
   * @returns { Promise <any> }
   */
  public sendMail (formData: any): Promise <any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = new FormData();
          body.append('check1', formData.check1);
          body.append('check2', formData.check2);
          body.append('email', formData.email);
          body.append('message', formData.message);
          body.append('name', formData.name);
          body.append('subject', formData.subject);

    return new Promise ((resolve, reject) => {

      this.httpClient.get(
        this.emailAPI + `?email=${formData.email}&message=${formData.message}&name=${formData.name}&subject=${formData.subject}&check1=${formData.check1}&check2=${formData.check2}`
      )
      .subscribe(
        data => resolve(data),
        error => reject(error)
      );
    });
  }
}
