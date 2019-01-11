import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      res => {
        console.log('Subs', res);
      },  
      error => console.error('Error en el obs', error ),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;


        const salida = {
          valor: contador
        };

        const obj = {
          'id' : '1',
          'name' : 'ED'

        }


      //  observer.next(salida);
        observer.next(obj);


        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }

      }, 1000 );

    }).pipe(
      map( resp => resp.valor),
           filter( ( num, index ) => {

        if (  (num % 2) === 1 ) {
          // impar
          return true;

        } else {
          // par
          return false;
        }
      }),
      map( res => {

        console.log('RES ', res);
      })
    );

  }

}
