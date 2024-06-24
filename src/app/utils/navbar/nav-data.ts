import { INavbarData } from "./helper"

export const navbarData: INavbarData[] = [


    {

        icon: ' fal fa-sharp fa-regular fa-globe',
        label: 'Ejercicio',
        items: [
            {
                routeLink: 'exercise/list',
                label: 'Mostrar Ejercicio'
            },
            {
                routeLink: 'exercise',
                label: 'Agregar Ejercicio',
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
    },
    {
        routeLink: 'muscular-group',
        icon: ' fal fa-sharp fa-solid fa-city',
        label: 'Grupo Muscular',
        items: [
            {
                routeLink: 'muscular-group/list',
                label: 'Listar Grupos Musculares',
            },
            {
                routeLink: 'muscular-group',
                label: 'Agregar Grupo Muscular'
            },
        ]
    },
    {
        // routeLink: 'workout-plan',
        routeLink: 'workout-plan',
        icon: ' fal fa-sharp fa-solid fa-city',
        label: 'Rutina',
        items: [
            {
                routeLink: 'workout-plan/list',
                label: 'Listar Rutinas',
            },
            {
                routeLink: 'workout-plan',
                label: 'Agregar Rutina'
            },
        ]

    }

];
