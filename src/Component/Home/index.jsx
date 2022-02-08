import SliderBanner from "./Slider";
import Products from "./Products";
import HotProducts from "./HotProducts";
import ServiceInfo from "../ServiceInfo";
function Home() {
  return (
    <div className="home">
      <SliderBanner />
      <Products />
      <HotProducts />
      <ServiceInfo />
    </div>
  );
}

export default Home;
