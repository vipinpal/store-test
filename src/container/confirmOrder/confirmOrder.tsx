import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../component/layout/layout';
import ConfirmOrder from '../../component/confirmOrder/confirmOrder';
import { useGlobalState } from '../../store/globalStateContext';
import { IItem } from '../../interfaces';
import { data } from './../../container/itemList/mockData';
import './../checkout/checkout.css';

const ItemDetail: React.FC = () => {
    const { state, dispatch } = useGlobalState();
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const { orderId = '' } = useParams<{ orderId: string }>();

    useEffect(() => {
        const itemId = state?.orderDetails[orderId]?.itemId;
        let selectedItemData: IItem[] = state.items.filter((item) => item.id === itemId);

        // if the item is not in the state then get it from the mock data
        if (selectedItemData.length === 0) {
            selectedItemData = data.filter((item) => item.id === itemId);
        }
        const selectedItem = { ...selectedItemData[0] };
        setSelectedItem(selectedItem);

        // hide the search box
        if (state.showSearchBox) {
            dispatch({ type: 'SET_SEARCH_BOX', payload: false });
        }
    }, [orderId, dispatch, state.showSearchBox, state.items, state.orderDetails]);

    return (
        <Layout>
            <div className='container'>
                {selectedItem &&
                    <ConfirmOrder
                        item={selectedItem}
                        orderDetails={{
                            fullName: state.orderDetails[orderId].fullName,
                            orderId,
                            emailId: state.orderDetails[orderId].email
                        }}
                    />}
            </div>
        </Layout>
    );
};

export default ItemDetail;