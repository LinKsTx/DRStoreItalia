import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IBlog } from 'src/app/interfaces/i-blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

  blog: IBlog = {
    titulo: "",
    contenido: "",
    imagen: "",
  }

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }
  //SE INICIA AUTOMÁTICAMENTE
    ngOnInit() {
      window.onscroll = function() {myFunction()};

    function myFunction() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";
    }
     //spinner
    //  this.spinner.show();

    //  setTimeout(() => {
    //    this.spinner.hide();

    //  }, 1500);
    const id = +this.route.snapshot.params["id"]; // Recibimos parámetro
    this.blogService.readBlogId(id)
    .subscribe(
    (p : any)=> this.blog = p[0],
    error => console.error(error)
    );
    if(sessionStorage.getItem('theme') == "modooscuro") {
      //Comprobar tema
      $("app-blog-detail").toggleClass("darkmode");
    } else if (sessionStorage.getItem('theme') == "modoclaro"){
      $('app-blog-detail').removeClass("darkmode");
    }
    }

}
