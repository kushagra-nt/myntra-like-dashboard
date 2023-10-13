import {faker} from '@faker-js/faker';
import {Product} from '../../../types';

export async function fetchProducts({
    count
}:{
    count: number;
}){
    const products:Product[] = [];

    for(let i=0 ; i<count ; i++){
        const originalPrice = parseInt(faker.commerce.price({min: 500,max: 2000}));
        products.push({
            brandName: faker.internet.displayName(),
            title: faker.commerce.product(),
            originalPrice: originalPrice,
            rating: Math.floor(Math.random()*4)+1,
            discountedPrice: Math.floor(originalPrice*0.8),
            imageUrl: faker.image.urlLoremFlickr({category: 'fashion', height: 400, width: 300}),
            ratingCount: faker.number.int({max:500,min: 100})
        })
    }
    return await Promise.all(products);
}