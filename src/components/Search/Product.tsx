import { useState } from "react";
import { Product } from "../../../types";
import { HeartIcon } from "../ui/Icons";

const ProductCard = ({product}: {product: Product}) => {

  const [hovering, setHovering] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="gap-y-2 w-56 basis-56 hover:cursor-pointer"
      onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=>setHovering(false)}
    >
      <div className="relative">
        <img src={product.imageUrl} alt="product image" width="full" height="400px"/>
        {hovering && (
          <p className="w-full bg-blue-400 bg-opacity-70 px-3 py-2 absolute bottom-0" >View Product</p>
        )}

        <button className="absolute top-2 right-3">
          <HeartIcon
            className={`w-6 h-6 text-white ${wishlisted? "outline-none border-none text-red-700": ""}`}
            color={wishlisted? "red": "none"}
            onClick={()=>{setWishlisted(!wishlisted)}}
          />
        </button>
      </div>

      <p className="font-bold">{product.title}</p>

      <p className="text-blue-500">
        <span className="line-through font-light text-slate-400 line">{`Rs. ${product.originalPrice}`}</span>
        {'  '}
        {`Rs. ${product.discountedPrice}`}
      </p>

      <p>{`${'⭐ '.repeat(product.rating)} (${product.ratingCount})`}</p>

    </div>
  )
}

export default ProductCard;