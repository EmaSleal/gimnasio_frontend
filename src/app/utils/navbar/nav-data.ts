import { INavbarData } from "./helper"

export const navbarData: INavbarData[] = [


    {
        routeLink: 'exercise',
        icon: ' fal fa-sharp fa-regular fa-globe',
        label: 'Ejercicio',
        items: [
            {
                routeLink: 'exercise/Agregar',
                label: 'Agregar Ejercicio',
            },
            {
                routeLink: 'exercise',
                label: 'Mostrar Ejercicio'
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
