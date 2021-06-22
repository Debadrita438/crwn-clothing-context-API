import { createContext, useState, useEffect } from 'react';
import { 
    addItemToCart, 
    filterItemFromCart, 
    getCartItemsCount, 
    getCartItemsTotal, 
    removeItemFromCart 
} from './cartUtils';

export const CartContext = createContext({
    cartItems: [],
    hidden: true,
    totalPrice: 0,
    cartItemsCount: 0,
    toggleHidden: () => {},
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {}
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setTotalPrice(getCartItemsTotal(cartItems));
    }, [cartItems]);


   return ( 
    <CartContext.Provider value={{
        hidden, toggleHidden, cartItems, addItem, removeItem, clearItemFromCart, cartItemsCount, totalPrice        
    }}>
            { children }
        </CartContext.Provider>
    );
}

export default CartProvider;