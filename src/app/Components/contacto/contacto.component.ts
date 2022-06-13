import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

   myLatLng = { lat: 38.505898773914154, lng: -0.23586552698900223 };
   labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: "D.R Store Italia"
}

  //CONSTRUCTOR
  constructor( private spinner: NgxSpinnerService,
    ) {

   }

  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
        //comprobar tema
    if(sessionStorage.getItem('theme') == "modooscuro") {
      $("app-contacto").addClass("darkmode");
    } else if (sessionStorage.getItem('theme') == "modoclaro"){
      $('app-contacto').removeClass("darkmode");
    }
    //spinner
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();

    }, 1500);

}

}
