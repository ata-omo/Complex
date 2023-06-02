import React, {useState, useEffect, useContext} from 'react';
import Slider from '../components/home/Slider';
import ProductBar from '../components/general/ProductBar';
import PopularCategories from '../components/home/PopularCategories';
import Header from '../components/general/Header';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import DataContext from '../contexts/DataContext';

const Home = () => {
    const [slides, setSlides] = useState([]);
    const [popCategories, setPopCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const {isLoggedIn, numCartItems, data, handleAddToCart} = useContext(DataContext);

    useEffect(() => {
        setSlides(data.slides);
        setPopCategories(data.popCategories);
        setProducts(data.products);

    },[data]);

  return (
    <>
    <Header numCartItems={numCartItems} isLoggedIn={isLoggedIn} />
    <Navbar />
    <main>
        <Slider slides={slides} />
        <ProductBar products={products} limit={5} columns={5} heading={"BEST SELLER"} handleAddToCart={handleAddToCart} isTitle={false}/>
        <ProductBar products={products} limit={6} columns={6} heading={"DEAL OF THE DAY"} handleAddToCart={handleAddToCart}/>
        <PopularCategories popCategories={popCategories}/>
        <ProductBar products={products} limit={5} columns={5} heading={"RECENTLY VIEWED"} handleAddToCart={handleAddToCart}/>
    </main>
    <Footer />
    </>
  )
}

export default Home