import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../component/layout/layout';
import { useGlobalState } from '../../store/globalStateContext';
import { IItem } from '../../interfaces';
import Checkout from '../../component/checkout/checkout';
import { data } from './../../container/itemList/mockData';
import './checkout.css';

// custom hook to get the query params
const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const ItemDetail: React.FC = () => {
    const { state, dispatch } = useGlobalState();
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    // get the item id from the query params
    let query = useQuery();
    const itemId = query.get('itemId');

    useEffect(() => {
        let selectedItemData: IItem[] = state.items.filter((item) => item.id === itemId);

        // if the item is not in the state then get it from the mock data
        if (selectedItemData.length === 0) {
            selectedItemData = data.filter((item) => item.id === itemId);
        }
        const selectedItem = { ...selectedItemData[0] };
        setSelectedItem(selectedItem);

        if (state.showSearchBox) {
            dispatch({ type: 'SET_SEARCH_BOX', payload: false });
        }
    }, [itemId, dispatch, state.showSearchBox, state.items]);

    return (
        <Layout>
            <div className='container'>
                <div>
                    {selectedItem &&
                        <Checkout item={selectedItem} />}
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;