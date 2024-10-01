// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';  // Notez la différence ici
import './slideService.css'
import data from './service-slide.json'
const SlideService = () => {
  return  (
    <div>
      <Swiper className='swiper'
        modules={[Navigation, Pagination]}  // Ajouter les modules ici
        spaceBetween={10}
        slidesPerView={1}
        navigation      // Activer la navigation (flèches)
        pagination={{ clickable: true }}  // Activer la pagination (points)

        breakpoints={{
            // Quand la largeur de la fenêtre est >= 1024px (ordinateur)
            1080: {
              slidesPerView: 3,  // Tous les slides affichés
            },
            // Quand la largeur de la fenêtre est >= 768px (tablette)
            800: {
              slidesPerView: 2, 
               // 3 slides affichés
            },
            // Quand la largeur de la fenêtre est >= 480px (téléphone)
           
          }}
      >
        {
                        data.map((card, i) => (
                            <SwiperSlide key={i}>
                                <div className="r-card" >
                                    <img src={card.image} alt="" />
                                    <span className=' primaryText'>{card.title}</span>
                                    <span className='secondaryText'>{card.detail}</span>
                                </div>
                            </SwiperSlide>
                        ))
                    }


      </Swiper>
    </div>
  );
};

export default SlideService;
