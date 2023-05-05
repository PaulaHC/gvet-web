import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from './Usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];
  
  
  constructor(private userService: UsuarioService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
	  this.activateRoute.paramMap.subscribe(params => {
		  this.userService.getUsuarios().pipe(
	          tap(response => {
	            console.log('UsuariosComponent: tap 3');
	            (response.content as Usuario[]).forEach(Usuario => console.log(Usuario.nombre));
	          })
         ).subscribe(response => {
          		this.usuarios = response.content as Usuario[];
        });
	});
  }

}
