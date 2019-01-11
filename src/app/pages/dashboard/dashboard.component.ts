import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';
// import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Look jQuery Animation working in action!';

  subscription: Subscription;

  constructor(private location: Location) {
   // this.pageRefresh();
   this.subscription = this.regresaObservable()
   .subscribe(
     numero => console.log('Subs', numero),
     error => console.error('Error en el obs', error ),
     () => console.log('El observador termino!')
   );
  
   }

  ngOnInit() {
 //   this.pageRefresh();
 

function refreshPage() { 
  location.reload(); 
}
}



  pageRefresh() {
    location.reload();
 }

 regresaObservable(): Observable<any> {

  return new Observable( (observer: Subscriber<any>) => {

    let contador = 0;

    const intervalo = setInterval( () => {

      contador++;


      const salida = {
        valor: contador
      };


      observer.next(salida);


       if ( contador === 5 ) {
         clearInterval(intervalo);
         observer.complete();
       //  location.reload();
       }

      // if ( contador === 2 ) {
      //   // clearInterval(intervalo);
      //   observer.error('Auxilio!');
      // }

    }, 1000 );

  }).pipe(
    map( resp => resp.valor),
    filter( ( valor, index ) => {

      if (  (valor % 2) === 1 ) {
        // impar
        return true;

      } else {
        // par
        return false;
      }
    })
  );

}

}
