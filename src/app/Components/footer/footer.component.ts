import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //CONSTRUCTOR
  constructor() { }

  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
     //comprobar tema
 if(sessionStorage.getItem('theme') == "modooscuro") {
  $("#div-footer").removeClass("bg-dark");
  $("#div-footer").addClass("oscurito")
} else if (sessionStorage.getItem('theme') == "modoclaro"){
  $("#div-footer").addClass("bg-dark");
  $("#div-footer").removeClass("oscurito")
}
  }

}
