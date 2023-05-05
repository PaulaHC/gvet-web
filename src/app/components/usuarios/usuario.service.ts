import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Usuario } from './Usuario';

@Injectable()
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }
  
  getUsuarios(): Observable <any>{
	  return this.http.get(this.urlEndPoint).pipe(
		  tap((response:any)=>{
			     console.log('UsuarioService: tap 1');
        		(response.content as Usuario[]).forEach(usuario => console.log(usuario.nombre));
		  }),
		  map((response: any) =>{
			          (response.content as Usuario[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
		  })
	  )
  }
}
