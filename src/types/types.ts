import { ReactNode } from "react"

export interface IFilm {
    id: number,
    name_ru: string,
    name_en: string,
    img: string,
    rating: number,
    genre: genre[],
    year: number,
    age: string,
    time: string,
    description: string,
    actros: crossPoint[]
    country: string[]
}
export interface genre {
    id: number,
    name_ru: string,
    name_en: string
}
export interface IFilmItem {
    film: IFilm
}
export interface IPeople {
    id: number,
    name: string,
    img: string,
    birthday: string,
    city: string,
    films: crossPoint[]
}
export interface PersonColumnProps {
    person: crossPoint
}
export interface crossPoint {
    id: number,
    name: string,
}
export interface FilmsListProps {
    films: IFilm[]
}
export interface ButtonProps {
    variant?: 'contained' | 'outlined' | "translucent";
    children: ReactNode;
    onClick?: () => void
}
export interface SelectorProps {
    name: string,
    array: any[],
    filter: 'none' | 'genre' | 'year',
    setSort?:  any,
    setYearFilter?: any
}