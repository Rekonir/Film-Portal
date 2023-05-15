import FilmData from '../../FilmData.json'
import styles from './CatalogPage.module.scss'
import Button from '../../components/UI/Button/Button';
import { Link, useParams } from 'react-router-dom';
import Path from '../../components/UI/Path/Path';
import FilmsList from '../../components/FilmsList/FilmsList';
import Selector from '../../components/UI/Selector/Selector';
import { useEffect, useState } from 'react';
import GenresData from '../../GenresData.json'



const CatalogPage = () => {
    const [Films, setFilms] = useState(FilmData);
    const [sortState, setSort] = useState('none');
    const { genre } = useParams()
    useEffect(() => {
        const genres = genre?.split('+')
        const filterFilms = FilmData.filter(film => {
            return film.genre.some(genre => {
                return genres?.includes(genre.name_en);
            });
        });
        if (filterFilms.length !== 0) {
            setFilms(filterFilms)
        }
        else { setFilms(FilmData) }

    }, [genre])
    useEffect(() => {
        switch (sortState) {
            case 'по рейтингу':
                setFilms([...Films].sort((a, b) => b.rating - a.rating));
                break;
            case 'по дате выхода (сначала свежие)':
                setFilms([...Films].sort((a, b) => b.year - a.year));
                break;
            case 'по дате выхода (сначала старые)':
                setFilms([...Films].sort((a, b) => a.year - b.year));
                break;
            case 'по алфавиту (А-Я)':
                setFilms([...Films].sort((a, b) => a.name_ru.localeCompare(b.name_ru)));
                break;
            case 'по алфавиту (Я-А)':
                setFilms([...Films].sort((a, b) => b.name_ru.localeCompare(a.name_ru)));
                break;
            default:
                setFilms(FilmData);
                break;
        }
    }, [sortState]);
    return (
        <div className={styles.page}>
            <Path>
                <p> Главная </p>
                <Link to="/movies">Фильмы</Link>
            </Path>
            <h1 className={styles.header} > Фильмы смотреть онлайн </h1>
            <div className={styles.filtersBox}>
                <Selector name={'Жанр'} array={GenresData} filter={'genre'} />
                <Selector name={'Год'} array={['2023', '2015']} filter={'year'} />
                <Selector name={"Сортировка"} filter='none' setSort={setSort} array={['по количеству оценок на кинопоиске', 'по рейтингу', 'по дате выхода (сначала свежие)', 'по дате выхода (сначала старые)', 'по алфавиту (А-Я)', 'по алфавиту (Я-А)']} />
            </div >

            <FilmsList films={Films} ></FilmsList>

            <Button variant='outlined'>
                Показать ещё
                <img src="https://start.ru/static/images/product/arrow-down.svg" alt="" />
            </Button>
        </div >


    );
};

export default CatalogPage;