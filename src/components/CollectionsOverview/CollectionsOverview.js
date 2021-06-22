import { useContext } from 'react';

import CollectionContext from '../../contexts/collection/collection.context';

import CollectionPreview from '../CollectionPreview/CollectionPreview';

import './CollectionsOverview.scss';


const CollectionsOverview = () => {
    const collectionsMap = useContext(CollectionContext);
    const collections = Object.values(collectionsMap);

    return ( 
        <div className='collections-overview'>
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={ id } { ...otherCollectionProps } />
                ))
            }
        </div>
    );
}
 
export default CollectionsOverview;