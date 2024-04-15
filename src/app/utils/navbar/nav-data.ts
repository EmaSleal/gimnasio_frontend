import { INavbarData } from "./helper"

export const navbarData: INavbarData[] = [


    {
        routeLink: 'exercise',
        icon: ' fal fa-sharp fa-regular fa-globe',
        label: 'Ejercicio',
        items: [
            {
                routeLink: 'exercise/add',
                label: 'Agregar Ejercicio',
            },
            {
                routeLink: 'exercise',
                label: 'Mostrar Ejercicio'
            },
        ]
    },
    {
        routeLink: 'user',
        icon: ' fal fa-sharp fa-solid fa-city',
        label: 'Usuario',
        items: [
            {
                routeLink: 'user/list',
                label: 'Listar Usuarios',
            },
            {
                routeLink: 'user',
                label: 'Agregar Usuario'
            },
        ]
    }

];
