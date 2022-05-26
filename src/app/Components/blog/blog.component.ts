import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces/i-blog';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { BlogService } from 'src/app/services/blog.service';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

  blog: IBlog = {
    id: 0,
    titulo: "",
    contenido: "",
    categoria: "",
    imagen: "",
    fecha: new Date(Date.now()),
  }

  blogeditado: IBlog = {
    id: 0,
    titulo: "",
    contenido: "",
    categoria: "",
    imagen: "",
    fecha: new Date(Date.now()),
  }

  blogs: IBlog[];

  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: ""
  }

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  //SE INICIA AUTOMÁTICAMENTE
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
    //------------------------------------------
    //-- leer Blog -----------------------------
    this.obtenerBlogs();
    //------------------------------------------
     }

/*----------------------- CREAR BLOG ---------------------------*/
  crearBlog() {
    this.blogService.addBlog(this.blog).subscribe(()=>{
      console.log(this.blog);
      this.blog = {
        titulo: "",
        contenido: "",
        imagen: "",
        fecha: new Date(Date.now()),
      }
      this.obtenerBlogs();
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- OBTENER BLOGS ------------------------*/
  obtenerBlogs(){
      this.blogService.readBlog().subscribe((data: any) =>{
      console.log(data);
      this.blogs = data;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- ELIMINAR BLOGS -----------------------*/
  eliminarBlogs(id: number, posicion: number){
    this.blogService.deleteBlog(id).subscribe((data: any) =>{
      this.blogs.splice(posicion, 1);
  });
  }
/*--------------------------------------------------------------*/
/*----------------------- EDITAR BLOGS -------------------------*/
updateBlogs(datosEditados: IBlog){
  console.log(datosEditados);
  this.blogService.editBlog(datosEditados).subscribe((data: any) =>{
    this.blogeditado = {
      id: 0,
      titulo: "",
      contenido: "",
      imagen: "",
      fecha: new Date(Date.now()),
    }
    this.obtenerBlogs();
});
}
/*--------------------------------------------------------------*/
/*----------------------- PASAR INFO PARA UPDATE ---------------*/
pasarInfo(datos: IBlog){
  this.blogeditado.id = datos.id;
  this.blogeditado.titulo = datos.titulo;
  this.blogeditado.contenido = datos.contenido;
  this.blogeditado.categoria = datos.categoria;
  this.blogeditado.imagen = datos.imagen;
  this.blogeditado.fecha = datos.fecha;
}
/*--------------------------------------------------------------*/
/*----------------------- CHANGE IMAGE -------------------------*/
changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.blog.imagen = reader.result as string;
    });
}
/*--------------------------------------------------------------*/
/*----------------------- FILE SELECTED ------------------------*/
onFileSelected(event: any){
      this.changeImage(event.target);
}
/*--------------------------------------------------------------*/
/*----------------------- CHANGE IMAGE 2 ------------------------*/
changeImage2(fileInput: HTMLInputElement) {
  if (!fileInput.files || fileInput.files.length === 0) {
    return;
  }
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);
  reader.addEventListener('loadend', (e) => {
    this.blogeditado.imagen = reader.result as string;
  });
}
/*--------------------------------------------------------------*/
/*----------------------- FILE SELECTED 2 ----------------------*/
onFileSelected2(event: any){
    this.changeImage2(event.target);
}
/*--------------------------------------------------------------*/
hoverContenido() {

}
}
