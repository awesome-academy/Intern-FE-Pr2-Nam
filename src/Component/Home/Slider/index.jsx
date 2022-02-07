import Slider from "react-slick";
import "./style.scss";

function SliderBanner() {
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };
  const slideImage = [
    {
      desc: "banner 1",
      url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/media/first_hero.e7fe7598b3d23101534ffaa1817549d6.jpg",
    },
    {
      desc: "banner 2",
      url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/media/second_hero.54e92a4305d8302c245006b1e8c8a10c.jpg",
    },
    {
      desc: "banner 3",
      url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/media/bg.450cfc7781058eb8f7c3e254a483d147.png",
    },
  ];
  return (
    <section className="SliderBanner">
      <Slider {...settings}>
        {slideImage.map((item, index) => (
          <img
            className="SliderBanner_img"
            key={index}
            src={item.url}
            alt={item.desc}
          />
        ))}
      </Slider>
    </section>
  );
}

export default SliderBanner;
