import { createContext } from 'react';

import SHOP_DATA from './shopData';

const CollectionContext = createContext(SHOP_DATA);

export default CollectionContext;