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
      titulo: 'Contabilidad',
      icono: 'mdi mdi-chart-bar',
      submenu: [
        { titulo: 'Cuentas Contables', url: '/accounting' },
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
    },
    {
      titulo: 'Clientes',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        { titulo: 'Cuentas de Clientes', url: '/customers' },
        { titulo: 'Facturas', url: '/customer-invoice' },
        { titulo: 'Cargar Archivo de Clientes', url: '/upload-customers' },

      ]
    },
    {
      titulo: 'Proveedores',
      icono: 'mdi mdi-truck',
      submenu: [
        { titulo: 'Cuentas de Proveedores', url: '/suppliers' },
        { titulo: 'Compras', url: '/supplier-all-invoice' },
        { titulo: 'Cargar Archivo', url: '/upload-suppliers' },

      ]
    }
  ];

  constructor() { }

}
