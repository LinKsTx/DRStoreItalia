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
import { HttpClient, HttpClientModule } from '@angular/common/http';

//Rutas
const APP_ROUTES: Route[] = [
  //Home
  {path: 'home', component: HomeComponent},
  //Productos
  {path: 'productos', component: ProductosComponent},
  //Blog
  {path: 'blog', component: BlogComponent},
  //Contacto
  {path: 'contacto', component: ContactoComponent},
  //Ruta vacía redirección
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    BlogComponent,
    ContactoComponent,
    FooterComponent,
    NavOptionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
