import { INavbarData } from "./helper"

export const navbarData: INavbarData[] = [


    {
        routeLink: 'producto',
        icon: ' fal fa-sharp fa-regular fa-globe',
        label: 'Producto',
        items: [
            {
                routeLink: 'producto/Agregar',
                label: 'Agregar Producto',
            },
            {
                routeLink: 'producto/Mostrar',
                label: 'Mostrar Producto'
            },
        ]
    },
    {
        routeLink: 'factura',
        icon: ' fal fa-sharp fa-solid fa-city',
        label: 'Factura',
        items: [
            {
                routeLink: 'factura/Agregar',
                label: 'Agregar Factura',
            },
            {
                routeLink: 'factura/Mostrar',
                label: 'Mostrar Facturas'
            },
        ]
    }

];
