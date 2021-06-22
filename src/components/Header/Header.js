import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/Firebase';

import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';

import { CartContext } from '../../providers/cart/cart.provider';
import CurrentUserContext from '../../contexts/current-user/current-user.context';

import './Header.scss';


const Header = () => {
    const { hidden } = useContext(CartContext);
    const currentUser = useContext(CurrentUserContext);

    return (  
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/contact'>CONTACT</Link>
                {
                    currentUser
                    ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    : <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null:
                <CartDropdown />
            }
        </div>
    );
}
 
export default Header;