import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './slice/category'  
import SubCategorySlice from './slice/subcategory'  
import CharacterSlice from './slice/character'  
import SubCharacterSlice from './slice/subcharacter'  
import ProductSlice from './slice/product'  
import CartSlice from './slice/cart'  
import WishlistSlice from './slice/wishlist'  
import UserSlice from './slice/user'  
import BlogSlice from './slice/blog'  
import AddressSlice from './slice/address'  
import RatingSlice from './slice/rating'  

export  const store = configureStore({
    reducer : {
        "category" : CategorySlice, 
        "subcategory" : SubCategorySlice, 
        "character" : CharacterSlice, 
        "subcharacter" : SubCharacterSlice, 
        "product" : ProductSlice, 
        "cart" : CartSlice,
        "wishlist" : WishlistSlice,
        "user" : UserSlice,
        "blog" : BlogSlice,
        "address" : AddressSlice,
        "rating" : RatingSlice,
    }
})
