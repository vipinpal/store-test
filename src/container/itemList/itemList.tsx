import React, { useEffect } from 'react';
import Layout from '../../component/layout/layout';
import { useGlobalState } from '../../store/globalStateContext';
import './itemList.css';
import { data } from './mockData';
import Item from '../../component/itemList/item/item';
import Filter from '../../component/itemList/filter/filter';
import { IItem } from '../../interfaces/item';

const ItemList: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // generate items from the mock data file
        const generatedItems: IItem[] = data;

        // set items in the global state
        dispatch({ type: 'SET_ITEMS', payload: generatedItems });

        // set search box to true in the global state
        dispatch({ type: 'SET_SEARCH_BOX', payload: true });
    }, [dispatch]);

    // filter items based on search term
    const filteredItems = state.items?.filter((item) => item.title?.toLowerCase().includes(state.searchTerm));

    return (
        <Layout>
            <div className='container'>
                <Filter />
                <div className='item-grid'>
                    {
                        filteredItems.length > 0 ? filteredItems.map((item) => <Item item={item} key={item.id} />) :
                            <div className='no-item'>No items found</div>
                    }
                </div>
            </div>
        </Layout>
    );
};

export default ItemList;