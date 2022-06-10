import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {

  //CONSTRUCTOR
  constructor() { }

  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
//------------------
// if(sessionStorage.getItem('theme') == "modoclaro") {
//   $("#darkthemebutton").click(function(){
//     sessionStorage.setItem('theme', "modooscuro");
//   });
// } else if (sessionStorage.getItem('theme') == "modooscuro" ) {
//   $("#darkthemebutton").click(function(){
//     sessionStorage.setItem('theme', "modoclaro");
//   });
// } else {
//   $("#darkthemebutton").click(function(){
//     sessionStorage.setItem('theme', "modooscuro");
//   });
// }
//------------------
 //comprobar tema
 if(sessionStorage.getItem('theme') == "modooscuro") {
  $("#nav-options").removeClass("bg-dark");
  $("#nav-options").addClass("oscurito")
} else if (sessionStorage.getItem('theme') == "modoclaro"){
  $("#nav-options").addClass("bg-dark");
  $("#nav-options").removeClass("oscurito")
}
  }

  darkMode() {
//------------------
if(sessionStorage.getItem('theme') == "modoclaro") {
    sessionStorage.setItem('theme', "modooscuro");
    //componentes
    $("app-blog").addClass("darkmode");
    $("app-blog-detail").addClass("darkmode");
    $("app-home").addClass("darkmode");
    $("app-productos").addClass("darkmode");
    $("app-productos-detail").addClass("darkmode");
    $("app-contacto").addClass("darkmode");
    //nav-options
    $("#nav-options").removeClass("bg-dark");
    $("#nav-options").addClass("oscurito")
     //footer
     $("#div-footer").removeClass("bg-dark");
     $("#div-footer").addClass("oscurito")
    //elementos navbar
    //color fondo
    $("#navxs").removeClass("bg-light");
    $("#navxs").addClass("bg-dark");
    $("#navxl").removeClass("bg-light");
    $("#navxl").addClass("bg-dark");
    //letra
    $("#navegadorxs").removeClass("navbar-light");
    $("#navegadorxs").addClass("navbar-dark");
    $("#navegadorxl").removeClass("navbar-light");
    $("#navegadorxl").addClass("navbar-dark");
    //imagen
    $("#logoxs").attr("src",'../../../assets/images/logo-claro.png');
    $("#logoxl").attr("src",'../../../assets/images/logo-claro.png');
    //modales etc
    $("#dropdown-sinfotoxs").removeClass("bg-light");
    $("#dropdown-sinfotoxs").addClass("bg-dark");

    $("#dropdown-confotoxs").removeClass("bg-light");
    $("#dropdown-confotoxs").addClass("bg-dark");

    $("#dropdown-confotoxsxs").removeClass("bg-light");
    $("#dropdown-confotoxsxs").addClass("bg-dark");

    $("#dropdown-sinfoto").removeClass("bg-light");
    $("#dropdown-sinfoto").addClass("bg-dark");

    $("#dropdown-confoto").removeClass("bg-light");
    $("#dropdown-confoto").addClass("bg-dark");

    $("#dropdown-carrito").removeClass("bg-light");
    $("#dropdown-carrito").addClass("bg-dark");

} else if (sessionStorage.getItem('theme') == "modooscuro" ) {
    sessionStorage.setItem('theme', "modoclaro");
    //componentes
    $("app-blog").removeClass("darkmode");
    $("app-blog-detail").removeClass("darkmode");
    $("app-home").removeClass("darkmode");
    $("app-productos").removeClass("darkmode");
    $("app-productos-detail").removeClass("darkmode");
    $("app-contacto").removeClass("darkmode");
    //navoptions
    $("#nav-options").addClass("bg-dark");
    $("#nav-options").removeClass("oscurito")
     //footer
     $("#div-footer").addClass("bg-dark");
     $("#div-footer").removeClass("oscurito")
    //elementos navbar
     //color fondo
     $("#navxs").removeClass("bg-dark");
     $("#navxs").addClass("bg-light");
     $("#navxl").removeClass("bg-dark");
     $("#navxl").addClass("bg-light");
     //letra
     $("#navegadorxs").removeClass("navbar-dark");
     $("#navegadorxs").addClass("navbar-light");
     $("#navegadorxl").removeClass("navbar-dark");
     $("#navegadorxl").addClass("navbar-light");
     //imagen
     $("#logoxs").attr("src",'../../../assets/images/logo-oscuro.png');
     $("#logoxl").attr("src",'../../../assets/images/logo-oscuro.png');
     //modales etc
     $("#dropdown-sinfotoxs").addClass("bg-light");
    $("#dropdown-sinfotoxs").removeClass("bg-dark");

    $("#dropdown-confotoxs").addClass("bg-light");
    $("#dropdown-confotoxs").removeClass("bg-dark");

    $("#dropdown-confotoxsxs").addClass("bg-light");
    $("#dropdown-confotoxsxs").removeClass("bg-dark");

    $("#dropdown-sinfoto").addClass("bg-light");
    $("#dropdown-sinfoto").removeClass("bg-dark");

    $("#dropdown-confoto").addClass("bg-light");
    $("#dropdown-confoto").removeClass("bg-dark");

    $("#dropdown-carrito").addClass("bg-light");
    $("#dropdown-carrito").removeClass("bg-dark");


} else {
    sessionStorage.setItem('theme', "modooscuro");
    //componentes
    $("app-blog").addClass("darkmode");
    $("app-blog-detail").addClass("darkmode");
    $("app-home").addClass("darkmode");
    $("app-productos").addClass("darkmode");
    $("app-productos-detail").addClass("darkmode");
    $("app-contacto").addClass("darkmode");
    //navoptions
    $("#nav-options").removeClass("bg-dark");
    $("#nav-options").addClass("oscurito")
    //footer
    $("#div-footer").removeClass("bg-dark");
    $("#div-footer").addClass("oscurito")
    //elementos navbar
   //color fondo
   $("#navxs").removeClass("bg-light");
   $("#navxs").addClass("bg-dark");
   $("#navxl").removeClass("bg-light");
   $("#navxl").addClass("bg-dark");
   //letra
   $("#navegadorxs").removeClass("navbar-light");
   $("#navegadorxs").addClass("navbar-dark");
   $("#navegadorxl").removeClass("navbar-light");
   $("#navegadorxl").addClass("navbar-dark");
   //imagen
   $("#logoxs").attr("src",'../../../assets/images/logo-claro.png');
   $("#logoxl").attr("src",'../../../assets/images/logo-claro.png');
   //modales etc
   $("#dropdown-sinfotoxs").removeClass("bg-light");
    $("#dropdown-sinfotoxs").addClass("bg-dark");

    $("#dropdown-confotoxs").removeClass("bg-light");
    $("#dropdown-confotoxs").addClass("bg-dark");

    $("#dropdown-confotoxsxs").removeClass("bg-light");
    $("#dropdown-confotoxsxs").addClass("bg-dark");

    $("#dropdown-sinfoto").removeClass("bg-light");
    $("#dropdown-sinfoto").addClass("bg-dark");

    $("#dropdown-confoto").removeClass("bg-light");
    $("#dropdown-confoto").addClass("bg-dark");

    $("#dropdown-carrito").removeClass("bg-light");
    $("#dropdown-carrito").addClass("bg-dark");


}
//------------------
  }

}
