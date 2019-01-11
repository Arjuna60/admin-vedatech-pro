import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RXJS', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Accounting',
      icono: 'mdi mdi-book',
      submenu: [
        { titulo: 'Accounting', url: '/accounting' },
        { titulo: 'Envio de Archivo', url: '/upload' }
      ]
    },

    {
      titulo: 'Bancos',
      icono: 'mdi mdi-bank',
      submenu: [
        { titulo: 'Cuentas Bancarias', url: '/bank-account' },
        { titulo: 'Movimientos', url: '/bank' },
        { titulo: 'Cargar Archivo', url: '/upload-bank' },

      ]
    }
  ];

  constructor() { }

}
