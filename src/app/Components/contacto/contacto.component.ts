import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  //CONSTRUCTOR
  constructor() { }

  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
     //comprobar tema
 if(sessionStorage.getItem('theme') == "modooscuro") {
  $("app-contacto").addClass("darkmode");
} else if (sessionStorage.getItem('theme') == "modoclaro"){
  $('app-contacto').removeClass("darkmode");
}
  }

}
