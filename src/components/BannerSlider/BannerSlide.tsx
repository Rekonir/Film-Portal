import { FC } from 'react'
import { IFilm } from '../../types/types'
import styles from './BannerSlide.module.scss'
import Button from '../UI/Button/Button'
import favorite from '../../assets/img/svg/favorite.svg'
import { useWindowWidth } from '../../hooks/hooks'
import { useTranslation } from 'react-i18next'

interface BannerSlideProps {
    film: IFilm
}

const BannerSlide: FC<BannerSlideProps> = ({film}) => {

  const { t } = useTranslation()

  const windowWidth = useWindowWidth()

  return (
    <div className={styles.BannerSlide} style={{minWidth: windowWidth, maxWidth: windowWidth}}>
      <div className={styles.banner} style={{backgroundImage: `url("https://startimg.ru/unsafe/1920x1080/filters:format(webp)/ade6b3ae071a4ce7824f0803a89288af/background_15x")`}}>
        {/* <img src={film.img} alt="" /> */}
      </div>

      <div className={styles.info}>
        <h1 className={styles.filmName}>{film?.name_ru}</h1>
        <div className={styles.descriptionShort}>
          <span className={styles.descItem}>{film?.world_premier}</span>
            {film?.genres.map((genre, index) => (
              <span key={index} className={styles.descItem}>{genre.name_ru}</span>
            ))}
          <span className={styles.descItem}>
            <div className={styles.age}>{film?.age}</div>
          </span>
        </div>
        <div className={styles.description}>
          {/* <p>{film?.description} </p> */}
        </div>
        <div className={styles.buttons}>
          <Button >
            <img src="https://start.ru/static/images/movie/play.svg" />
              {t("watch_for_free")}
          </Button>
          <Button variant="translucent">
            <img src="https://start.ru/static/images/product/kino.svg" />
              {t('trailer')}
          </Button>
          <Button variant="translucent">
            <img src={favorite}/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BannerSlide