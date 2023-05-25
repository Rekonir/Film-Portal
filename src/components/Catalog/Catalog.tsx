import { FC, useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import FilmData from '../../FilmData.json';
import FilmsList from '../../components/FilmsList/FilmsList';
import Selector from '../UI/Selector/Selector';
import Button from '../../components/UI/Button/Button';
import YearData from '../../YearData.json'
import Slider from '../../components/UI/Slider/Slider';
import InputBox from '../UI/InputBox/InputBox';
import GenresData from '../../GenresData.json'
import { Link } from 'react-router-dom';
import TranscriptionData from '../../TranscriptionData.json'
import { useAppSelector } from '../../hooks/redux';

interface CatalogProps {
    genres: string[]
}

const Catalog: FC<CatalogProps> = ({ genres }) => {
    const [Films, setFilms] = useState(FilmData);
    const [sortState, setSort] = useState('none');
    const [yearFilter, setYearFilter] = useState<string>('')
    const [ratingFilter, setRatingFilter] = useState<number>(0)
    const [ratingValueFilter, setratingValueFilter] = useState<number>(0)
    const [countryFilter, setCountryFilter] = useState<string>("")
    const [actrosFilter, setActrosFilter] = useState<string>("")
    const [directorFilter, setDirectorFilter] = useState<string>("")

    const { RusLanguage } = useAppSelector(state => state.languageReducer)
    const [language, setLanguage] = useState(TranscriptionData[0])
    useEffect(() => {
        RusLanguage ? setLanguage(TranscriptionData[0]) : setLanguage(TranscriptionData[1])
    }, [RusLanguage])

    useEffect(() => {
        let filterFilms = FilmData;
        if (yearFilter) {
            filterFilms = filterFilms.filter(film => String(film.year) === yearFilter.toLowerCase());
        }
        if (!genres.includes('')) {

            filterFilms = filterFilms.filter(film => {
                return film.genre.some(genre => {
                    return genres?.includes(genre.name_en);
                });
            });
        }
        if (ratingFilter) {
            filterFilms = filterFilms.filter(film => film.rating >= ratingFilter);

        }
        // if (ratingValueFilter) {
        //     filterFilms = filterFilms.filter(film => film.ratingValue === ratingValueFilter);

        // 
        if (countryFilter) {
            filterFilms = filterFilms.filter(film => film.country.map(e => e.toLowerCase()).includes(countryFilter.toLowerCase()));
        }
        if (actrosFilter) {
            filterFilms = filterFilms.filter((film) =>
                film.actor.some((actor) => actor.name.includes(actrosFilter))
            );
        }
        // if (directorFilter) {
        //     filterFilms = filterFilms.filter((film) =>
        //         film.director.some((director) => director.name_ru.includes(actrosFilter)|| director.name_en.includes(actrosFilter))
        //     );
        // }
        setFilms(filterFilms)
    }, [yearFilter, genres, ratingFilter, ratingValueFilter, countryFilter, actrosFilter, directorFilter])
    useEffect(() => {
        switch (sortState) {
            case 'по рейтингу':
                setFilms(prev => [...prev].sort((a, b) => b.rating - a.rating));
                break;
            case 'по дате выхода (сначала свежие)':
                setFilms(prev => [...prev].sort((a, b) => b.year - a.year));
                break;
            case 'по дате выхода (сначала старые)':
                setFilms(prev => [...prev].sort((a, b) => a.year - b.year));
                break;
            case 'по алфавиту (А-Я)':
                setFilms(prev => [...prev].sort((a, b) => a.name_ru.localeCompare(b.name_ru)));
                break;
            case 'по алфавиту (Я-А)':
                setFilms(prev => [...prev].sort((a, b) => b.name_ru.localeCompare(a.name_ru)));
                break;
            default:
                setFilms(FilmData);
                break;
        }
    }, [sortState]);
    return (

        <>
            <div className={styles.filtersBox}>
                <Selector name_ru={'Жанр'} array={GenresData} filter={'genre'} name_en={'Genre'} />
                <Selector func={setYearFilter} name_ru={'Год'} array={YearData} filter={'year'} name_en={'Year'} />
                <Selector func={setCountryFilter} name_ru={'Страны'} array={["США", "Росcия"]} filter='none' name_en={'Country'} />
                <Slider func={setRatingFilter} max={10} name_ru={'Рейтинг от'} name_en={'Rating from'} />
                <Slider func={setratingValueFilter} max={1000000} name_ru={'Кол-во оценок от'} name_en={'Number of ratings from'} />
                <InputBox name_ru='Поиск по актёрам' func={setActrosFilter} name_en={'Search by actors'} />
                <InputBox name_ru='Поиск по режиссёру' func={setDirectorFilter} name_en={'Search by director'} />
                <Link to='/movies/'>
                    <Button variant='outlined' >{language.Button.clean}</Button>
                </Link >
                <Selector name_ru={"Сортировка"} filter='none' func={setSort} array={['по количеству оценок на кинопоиске', 'по рейтингу', 'по дате выхода (сначала свежие)', 'по дате выхода (сначала старые)', 'по алфавиту (А-Я)', 'по алфавиту (Я-А)']} name_en={'Sort'} />
            </div >
            <FilmsList films={Films}></FilmsList>
            <Button variant='outlined'>
                {language.Button.more}
                <img src="https://start.ru/static/images/product/arrow-down.svg" alt="" />
            </Button>
        </>

    );
};

export default Catalog;