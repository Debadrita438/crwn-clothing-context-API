import { useContext } from 'react';

import CustomButton from '../CustomButton/CustomButton';

import { CartContext } from '../../providers/cart/cart.provider';

import './CollectionItem.scss';


const CollectionItem = ({ item }) => {
    const { name, price, imageUrl } = item;
    const { addItem } = useContext(CartContext);

    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <CustomButton onClick={ () => addItem(item) } inverted>
                Add to cart
            </CustomButton>
        </div> 
    )
};
 
export default CollectionItem;