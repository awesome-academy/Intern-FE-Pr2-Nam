import SliderBanner from "./Slider";
import Products from "./Products";
import HotProducts from "./HotProducts";
function Home() {
  return (
    <div className="home">
      <SliderBanner />
      <Products />
      <HotProducts />
    </div>
  );
}

export default Home;
