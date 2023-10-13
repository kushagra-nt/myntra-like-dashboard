import { useSearchParams } from "react-router-dom";
import ProductCard from './Product';
import { Suspense, useEffect, useState } from "react";
import { fetchProducts } from "../../api/products";
import SearchBar from "../ui/SearchBar";
import { Product } from "../../../types";
import FilterBar from "./FilterBar";

const Search = () => {

  const [filteredProdcuts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({
    brands: "",
    priceRange: "",
    rating: "",
    query: ""
  })

  useEffect(()=>{
    const getProducts = async()=>{
      const products = await fetchProducts({count: 12});
      setFilteredProducts(products);
    }
    getProducts();
  },[]);

  const brands = (searchParams.get("brands"))?searchParams.get("brands")?.split(','):[];
  const priceRange = (searchParams.get("priceRange"))?searchParams.get("priceRagne")?.split('-'):[];
  const rating = (searchParams.get("rating"))?searchParams.get("rating")?.split(','):[];
  const searchQuery = searchParams.get("query") || '';

  const handleSearch = ()=>{
    // handle search here
  }

  useEffect(()=>{
    // handle filters here
  },[brands, priceRange, rating, searchQuery]);

  return (
    <Suspense fallback={<h1>loading...</h1>}>
    <div className="w-full">

      <SearchBar
        searchValue={searchQuery}
        setSearchValue={(value:string)=>{
          setSearchParams((prev) => {
            return {
              ...prev,
              query: value
            }
          })
        }}
        className="w-[40%] sm-w-[60%] mt-8 "
        handleSubmit={handleSearch}
      />

      <div className="flex mt-16">
        <FilterBar searchParams={searchParams} setSearchParams={setSearchParams} />

        <div className="md:max-w-[80%] flex flex-row gap-10 flex-wrap justify-center">
          {filteredProdcuts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

    </div>
    </Suspense>
  )
}

export default Search