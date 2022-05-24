import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces/i-blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blog: IBlog = {
    titulo: "",
    contenido: "",
    imagen: "",
  }

  constructor(private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

    ngOnInit() {
      const id = +this.route.snapshot.params["id"]; // Recibimos parámetro
      this.blogService.readBlogId(id)
      .subscribe(
      (p : any)=> this.blog = p[0],
      error => console.error(error)
      );
      }

}
