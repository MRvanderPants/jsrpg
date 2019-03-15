import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public messageSend: boolean;
  public errorMessage: string;

  constructor(private dataService: DataService) {

    this.errorMessage = '';
    this.messageSend = false;

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, , Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl(''),
      message: new FormControl('', [Validators.required, Validators.minLength(3)]),
      check1: new FormControl(''),
      check2: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {
  }


  /**
   * Event callback for the form submit event
   */
  public submit (): void {

    this.dataService.sendMail(this.contactForm.value).then((response) => {

      switch (response) {

        case 'succes': {
          this.messageSend = true;
          break;
        }

        default: {
          this.errorMessage = 'Could not send your message as not all fields were corretly filled in.';
          break;
        }
      }
    });
  }
}
