import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlog } from '../interfaces/i-blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Crear blogs
  addBlog(Blog: IBlog){
    return this.http.post(`${this.baseUrl}/blog/crear_blog.php`, Blog);
  }

  //Ver blogs
  readBlog(){
    return this.http.get(`${this.baseUrl}/blog/ver_blog.php`);
  }

  //Ver blog por id
  readBlogId(id: number){
    return this.http.get(`${this.baseUrl}/blog/ver_blog_id.php?id=${id}`);
  }

  //Eliminar blogs
  deleteBlog(id: number){
    return this.http.delete(`${this.baseUrl}/blog/eliminar_blog.php?id=${id}`);
  }

  //Editar blogs
  editBlog(Blog: IBlog){
    return this.http.put(`${this.baseUrl}/blog/editar_blog.php`, Blog);
  }

}
