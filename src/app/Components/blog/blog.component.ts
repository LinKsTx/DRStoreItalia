import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces/i-blog';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { BlogService } from 'src/app/services/blog.service';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

filtrobusqueda = "";

filtrocategoria: string = "";

  p :number = 1;

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
    private spinner: NgxSpinnerService
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
    }
    //------------------------------------------
    //-- leer Blog -----------------------------
    this.obtenerBlogs();
    //------------------------------------------
    //comprobar tema
    if(sessionStorage.getItem('theme') == "modooscuro") {
      $("app-blog").addClass("darkmode");
      $("#nav-blog1").removeClass("bg-light");
        $("#nav-blog1").addClass("bg-dark");
        $("#nav-blog2").removeClass("bg-light");
        $("#nav-blog2").addClass("bg-dark");
        $("a").removeClass("txtdark");
        $("a").addClass("txtlight");
        $("#c-editar-blog").addClass("darkmode");
        $("#c-crear-blog").addClass("darkmode");
    } else if (sessionStorage.getItem('theme') == "modoclaro"){
      $('app-blog').removeClass("darkmode");
      $("#nav-blog1").addClass("bg-light");
      $("#nav-blog1").removeClass("bg-dark");
      $("#nav-prod2").addClass("bg-light");
      $("#nav-blog2").removeClass("bg-dark");
      $("a").addClass("txtdark");
      $("a").removeClass("txtlight");
      $("#c-editar-blog").removeClass("darkmode");
      $("#c-crear-blog").removeClass("darkmode");
    }
     //spinner
     this.spinner.show();

     setTimeout(() => {
       this.spinner.hide();

     }, 1500);
     }

/*----------------------- CREAR BLOG ---------------------------*/
  crearBlog() {
      this.blogService.addBlog(this.blog).subscribe(()=>{
        this.blog = {
          titulo: "",
          contenido: "",
          imagen: "",
          fecha: new Date(Date.now()),
        }
        $("#crear-blog-input").val("");
        this.obtenerBlogs();
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'El blog se ha creado correctamente',
          width: "300px",
          heightAuto: false,
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          },
          showConfirmButton: false,
          timer: 1500
        })
      });
  }
/*--------------------------------------------------------------*/
/*----------------------- OBTENER BLOGS ------------------------*/
  obtenerBlogs(){
        this.blogService.readBlog().subscribe((data: any) =>{
        this.blogs = data;
      });
  }
/*--------------------------------------------------------------*/
/*----------------------- ELIMINAR BLOGS -----------------------*/
  eliminarBlogs(id: number, posicion: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((data: any) =>{
          this.blogs.splice(posicion, 1);
          this.p=1;
          this.obtenerBlogs();
      });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }
/*--------------------------------------------------------------*/
/*----------------------- EDITAR BLOGS -------------------------*/
  updateBlogs(datosEditados: IBlog){
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
/*----------------------- COMPROBAR TEMA -----------------------*/
comprobarTema() {
  if(sessionStorage.getItem('theme') == "modooscuro") {

    $("#c-editar-blog").addClass("darkmode");
    $("#c-crear-blog").addClass("darkmode");

  } else if (sessionStorage.getItem('theme') == "modoclaro"){

    $("#c-editar-blog").removeClass("darkmode");
    $("#c-crear-blog").removeClass("darkmode");
  }
}
/*--------------------------------------------------------------*/
/*----------------------- FILTRAR CATEGORIA --------------------*/
filtrarCategoria(filtro: string){
  if(this.filtrocategoria == filtro) {

    this.filtrocategoria == null;
    this.filtrarCategoria("");


  } else {
    this.filtrocategoria = filtro;
  }
}
/*--------------------------------------------------------------*/
}
