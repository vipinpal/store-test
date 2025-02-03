import React, { useCallback } from 'react';
import { useGlobalState } from './../../store/globalStateContext';
import './header.css';

const Header: React.FC = () => {
    // get the global state and dispatch function
    const { state, dispatch } = useGlobalState();

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        // set the search term in the global state
        dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value.toLowerCase() });
    }, [dispatch]);

    return (
        <div className='store-app-bar'>
            <div className='logo'>Store</div>
            {state.showSearchBox && (
                <div className='search-box'>
                    <input className='search-input' type='text' placeholder='Search items...' onChange={handleSearch} />
                </div>
            )}
        </div>
    );
};

export default React.memo(Header);