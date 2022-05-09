import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBlog } from '../interfaces/i-blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Blogs Finales
  addBlog(Blog: IBlog){
    return this.http.post(`${this.baseUrl}/blog/crear_blog.php`, Blog);
  }
}
