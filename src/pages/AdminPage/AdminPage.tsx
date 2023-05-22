import { Link, useParams } from 'react-router-dom';
import Catalog from '../../components/Catalog/Catalog';
import styles from './AdminPage.module.scss';
import Path from '../../components/UI/Path/Path';
import InputBox from '../../components/UI/InputBox/InputBox'
import GenresData from '../../GenresData.json'
import FilmData from '../../FilmData.json'
import PeopleData from '../../PeopleData.json'
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import ProfessionsData from '../../ProfessionsData.json'
import Button from '../../components/UI/Button/Button';
import { useEffect, useState } from 'react';
import PersonColumn from '../../components/PersonColumn/PersonColumn';
import { useDispatch } from 'react-redux';


const AdminPage = () => {
    const dispatch = useDispatch()
    const { genre } = useParams()
    const genres = genre?.split('+') || ['']
    const [newFilmImg, setNewFilmImg] = useState('')
    const [newFilmYear, setNewFilmYear] = useState(0)
    const [newFilmCountry, setNewFilmCountry] = useState([''])
    const [newFilmTagline, setNewFilmTagline] = useState('')
    const [newFilmAge, setNewFilmAge] = useState(0)
    const [newFilmTime, setNewFilmTime] = useState(0)
    const [newFilmRating, setNewFilmRating] = useState(0.0)
    const [newFilmMarks, setNewFilmMarks] = useState(0)
    const [newFilmName_ru, setNewFilmName_ru] = useState('')
    const [newFilmName_en, setNewFilmName_en] = useState('')
    const [newFilmDescription, setNewFilmDescription] = useState('')
    const [newFilmGenres, setNewFilmGenres] = useState<string[]>([])
    const [personName, setPersonName] = useState('')
    const [personProf, setPersonProf] = useState<string[]>([])
    const [personImg, setPersonImg] = useState('')


    const formatTime = (minutes: number) => {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let result = minutes + " мин. / " + (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
        return result;
    }
    const addGenrePosition = (genre: any, isChecked: boolean) => {
        const updatedGenres = isChecked ? [...newFilmGenres, genre.name_en] : newFilmGenres.filter((item) => item !== genre.name_en);
        setNewFilmGenres(updatedGenres);
    }
    const addPersonProf = (prof: any, isChecked: boolean) => {
        const updatedProf = isChecked ? [...personProf, prof.name_en] : personProf.filter((item) => item !== prof.name_en);
        setPersonProf(updatedProf);
    }


    const [personsArray, setPersonsArray] = useState<any[]>([]);
    const addPerson = () => {
        let person = PeopleData.find(person => person.name === personName)
        const newPerson = {
            id: PeopleData.length + personsArray.length + 1,
            img: personImg || 'https://i.pinimg.com/736x/4e/cc/67/4ecc67781ecf9bd4b2fd69f7b8e16d02.jpg',
            name: personName,
            professions: personProf
        }
        if (person) {
            setPersonsArray([...personsArray, person])
        } else {
            setPersonsArray([...personsArray, newPerson])
        }
    }
    useEffect(() => {
        console.log(personsArray)
    }, [personsArray])

    let addedFilm = {}
    useEffect(() => {
        addedFilm = {
            id: FilmData.length + 1,
            img: newFilmImg,
            year: newFilmYear,
            country: newFilmCountry,
            tagline: newFilmTagline,
            age: `${newFilmAge}+`,
            time: formatTime(newFilmTime),
            rating: newFilmRating,
            marks: newFilmMarks,
            name_ru: newFilmName_ru,
            name_en: newFilmName_en,
            description: newFilmDescription,
            genres: newFilmGenres,
            director: personsArray.filter(person => person.professions.includes('director')),
            actor: personsArray.filter(person => person.professions.includes('actor')),
            producer: personsArray.filter(person => person.professions.includes('producer')),
            voice: personsArray.filter(person => person.professions.includes('voice')),
            writer: personsArray.filter(person => person.professions.includes('writer')),
            operator: personsArray.filter(person => person.professions.includes('operator')),
            composer: personsArray.filter(person => person.professions.includes('composer')),
            design: personsArray.filter(person => person.professions.includes('design')),
            editor: personsArray.filter(person => person.professions.includes('editor'))
        }
    }, [newFilmImg,
        newFilmYear,
        newFilmCountry,
        newFilmTagline,
        newFilmAge,
        newFilmTime,
        newFilmRating,
        newFilmMarks,
        newFilmName_ru,
        newFilmName_en,
        newFilmDescription,
        newFilmGenres,
        personsArray
    ])

    const [newFilm, setNewFilm] = useState(addedFilm)
    const addNewFilm = () => {
        setNewFilm(addedFilm)
        console.log(newFilm)
    }

    const toggleDeletMode = () => {
        dispatch({ type: 'toggleDel' })
    }

    return (
        <div className={styles.page}>
            <Path>
                <Link to="/"> Главная </Link>
                <Link to="/admin">Администрация</Link>
            </Path>
            <h1 className={styles.header}> Администрация </h1>
            <div className={styles.adminBox}>
                <div className={styles.inputs}>
                    <InputBox name={'Адрес изображения'} func={setNewFilmImg} />
                    <InputBox name={'Год'} inpType='number' func={setNewFilmYear} />
                    <InputBox name={'Страна'} func={setNewFilmCountry} />
                    <InputBox name={'Краткое описание'} func={setNewFilmTagline} />
                    <InputBox name={'Возрастное ограничение'} inpType='number' func={setNewFilmAge} />
                    <InputBox name={'Продолжительность в мин'} inpType='number' func={setNewFilmTime} />
                    <InputBox name={'Рейтинг'} inpType='number' func={setNewFilmRating} />
                    <InputBox name={'Кол-во оценок'} inpType='number' func={setNewFilmMarks} />
                    <InputBox name={'Название на русском'} func={setNewFilmName_ru} />
                    <InputBox name={'Название на английском'} func={setNewFilmName_en} />
                    <textarea placeholder='Полное описание' onChange={(e) => setNewFilmDescription(e.target.value)} />
                </div>

                <div className={styles.genreBox}>
                    {GenresData.map(filter => (
                        <Checkbox position={filter} key={filter.name_en} func={addGenrePosition} />
                    ))}
                </div >
                <div className={styles.inputs}>
                    <InputBox name={'Фамилия и Имя человека'} func={setPersonName} />
                    <InputBox name={'Ссылка на фото'} func={setPersonImg} />
                    <div className={styles.genreBox}>
                        {ProfessionsData.map(profession => (
                            <Checkbox position={profession} key={profession.name_en} func={addPersonProf} />
                        ))}
                    </div >
                    <div onClick={addPerson}>
                        <Button variant='outlined' >+ Добавить человека</Button>
                    </div>

                    {personsArray.map(person => (
                        <PersonColumn person={person} key={person.name} />
                    ))}
                </div>
            </div>
            <div onClick={addNewFilm}>
                <Button variant='outlined'>+ Добавить фильм</Button>
            </div>
            <div onClick={toggleDeletMode}>
                <Button variant='outlined'>- Удалить фильм</Button>
            </div>
            <Catalog genres={genres} />
        </div>
    );
};

export default AdminPage;