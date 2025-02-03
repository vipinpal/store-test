import React, { memo } from 'react';
import { useGlobalState } from '../../../store/globalStateContext';
import './filter.css';

const ItemList: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    return (
        <div className='filter-section'>
            <button onClick={() => dispatch({ type: 'SORT_ITEMS', payload: 'name' })}>
                Sort Name {state.sortField === 'name' && state.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
            <button onClick={() => dispatch({ type: 'SORT_ITEMS', payload: 'price' })}>
                Sort Price {state.sortField === 'price' && state.sortOrder === 'asc' ? 'Low-High' : 'High-Low'}
            </button>
        </div>
    );
};

export default memo(ItemList);