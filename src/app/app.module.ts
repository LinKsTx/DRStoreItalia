import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ContactoComponent } from './Components/contacto/contacto.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavOptionsComponent } from './Components/nav-options/nav-options.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BlogDetailComponent } from './Components/blog-detail/blog-detail.component';
import { ProductosDetailComponent } from './Components/productos-detail/productos-detail.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { BusquedaProductoPipe } from './pipes/busqueda-producto.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusquedaBlogPipe } from './pipes/busqueda-blog.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



//Rutas
const APP_ROUTES: Route[] = [
  //Home
  {path: 'home', component: HomeComponent},
  //Productos
  {path: 'productos', component: ProductosComponent},
  //Productos:id
  {path: 'productos-detail/:id', component: ProductosDetailComponent},
  //Blog
  {path: 'blog', component: BlogComponent},
  //Blog:id
  {path: 'blog-detail/:id', component: BlogDetailComponent},
  //Contacto
  {path: 'contacto', component: ContactoComponent},
  //Ruta vac??a redirecci??n
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    BlogComponent,
    ContactoComponent,
    FooterComponent,
    NavOptionsComponent,
    BlogDetailComponent,
    CategoriaPipe,
    BusquedaProductoPipe,
    BusquedaBlogPipe,
    ProductosDetailComponent,
    BlogDetailComponent


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey: "aqu??, la clave de google cloud platform"}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],

})
export class AppModule { }
  // AOT compilation support
  export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
