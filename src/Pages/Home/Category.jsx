import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import slide1 from "../../../src/assets/home/slide1.jpg";
import slide2 from "../../../src/assets/home/slide2.jpg";
import slide3 from "../../../src/assets/home/slide3.jpg";
import slide4 from "../../../src/assets/home/slide4.jpg";
import slide5 from "../../../src/assets/home/slide5.jpg";
import SectionTitle from "../../components/SectionTitle";

const Category = () => {
  return (
    <section className="px-4">
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11:00am to 10:00pm"}
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        //   centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <p className="uppercase text-white text-center text-2xl -mt-10 mb-4">
            Salads
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <p className="uppercase text-white text-center text-2xl -mt-10 mb-4">
            Soups
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <p className="uppercase text-white text-center text-2xl -mt-10 mb-4">
            Pizzas
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <p className="uppercase text-white text-center text-2xl -mt-10 mb-4">
            Desserts
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <p className="uppercase text-white text-center text-2xl -mt-10 mb-4">
            Salads
          </p>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
