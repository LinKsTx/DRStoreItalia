import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces/i-blog';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog: IBlog = {
    titulo: "",
    contenido: "",
    imagen: "",
    fecha: new Date(Date.now()),
  }

  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: ""
  }

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //-- Forma Cookies (usuario) ---------------
    let busca;
    let micookie;
    let igual;
    let valor;
    let listaCookies = document.cookie.split(";");
    for (let i in listaCookies) {
      busca = listaCookies[i].search("user");
      if (busca > -1) {
        micookie=listaCookies[i]
        igual = micookie.indexOf("=");
        valor = micookie.substring(igual+1);
      }

    }
    if(valor) {
      this.usuarioactivo = JSON.parse(valor);
    } else{
      console.log ("No hay usuario activo");
    }
  }

  crearBlog() {
    this.blogService.addBlog(this.blog).subscribe(()=>{
      console.log(this.blog);
      this.blog = {
        titulo: "",
        contenido: "",
        imagen: "",
        fecha: new Date(Date.now()),
      }
    });
  }

}