import { useContext } from 'react';

import MenuItem from '../MenuItem/MenuItem';

import DirectoryContext from '../../contexts/directory/directory.context';

import './Directory.scss';


const Directory = () => {
    const sections = useContext(DirectoryContext);

  return (
        <div className='directory-menu'>
            {
                sections.map(({  id, ...otherSectionProps }) => (
                    <MenuItem key={ id } { ...otherSectionProps } />
                ))
            }
        </div>
    );
}
 
export default Directory;