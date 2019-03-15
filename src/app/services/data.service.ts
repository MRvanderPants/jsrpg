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

    return new Promise ((resolve, reject) => {

      this.httpClient.get(
        this.emailAPI + `?email=${formData.email}&message=${formData.message}&name=${formData.name}&subject=${formData.subject}&check1=${formData.check1}&check2=${formData.check2}`
      )
      .subscribe(
        data => resolve(data),
        error => resolve(error.error.text)
      );
    });
  }
}
