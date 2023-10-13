import { useState, Suspense, useEffect } from "react";
import homePageBackgroundImage from '../../assets/images/home-page-background-image.jpeg';
import SearchBar from '../ui/SearchBar';
import { fetchProducts } from "../../api/products";
import { Product } from "../../../types";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const [searchValue, setSearchValue] = useState('');
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [latestTrendsDivFocus, setLatestTrendsDivFocus] = useState(false);
  const [latestTrends, setLatestTrends] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(()=>{
    const fun = async()=>{
      const products = await fetchProducts({count:5});
      setLatestTrends(products);
    }
    fun();
  },[]);

  const handleSearch = ()=>{
    if(!searchValue)return;
    navigate(`/search?query=${searchValue.trim().replace(/ /g,'+')}`);
  }

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <div
        className="bg-cover bg-no-repeat bg-center min-w-[100vw] min-h-[100vh]"
        style={{backgroundImage: `url(${homePageBackgroundImage})`}}
      >
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onFocus={()=>{setSearchBarFocus(true)}}
          onBlur={()=> {setSearchBarFocus(false)}}
          className="max-w-[60%] mt-[25vh] sm:w-[80%] transition ease delay-150 focus:-translate-y-50"
          handleSubmit={handleSearch}
        />

        {(searchBarFocus || latestTrendsDivFocus) && (
          <div
            className="w-[65%] sm-w-[80%] flex flex-col leading-7 m-auto my-10 bg-[#F3F3F4] py-5 px-10 rounded-lg"
            onMouseOver={()=>{console.log('mouse enter');setLatestTrendsDivFocus(true)}}
            onMouseLeave={()=>{console.log('mouse left');setLatestTrendsDivFocus(false)}}
            >
            
            <h3 className="font-bold">Latest Trends</h3>

            <div className="flex flex-row gap-10 mt-5 flex-wrap justify-center">
              {latestTrends.map((product: Product) => (
                <div className="flex flex-col flex-grow basis-32 hover:text-blue-600">
                  <Link to={`/search?query=${product.title.replace(' ','+')}`}>
                    <img src={product.imageUrl} alt='product image' className="w-32 h-44"/>
                    <h4 className="w-32 text-center">{product.title}</h4>
                  </Link>
                </div>
              ))}
            </div>

            <h3 className="font-bold my-4">Popular Suggestions</h3>

            <div className="leading-7">
              <Link to="/search?query=striped+shirt+dress">
                <h5 className="hover:text-blue-600">Striped shirt dress</h5>
              </Link>
              <Link to="/search?query=stain+shirts">
                <h5 className="hover:text-blue-600">Stain shirts</h5>
              </Link>
              <Link to="/search?query=denim+jumpsuit">
                <h5 className="hover:text-blue-600">Denim jumpsuit</h5>
              </Link>
              <Link to="/search?query=leather+dresses">
                <h5 className="hover:text-blue-600">Leather dresses</h5>
              </Link>
              <Link to="/search?query=solid+tshirts">
                <h5 className="hover:text-blue-600">solid tshirts</h5>
              </Link>
            </div>

          </div>
        )}
      </div>
    </Suspense>
  )
}

export default Home