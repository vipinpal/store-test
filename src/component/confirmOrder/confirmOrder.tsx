import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Card from '../card/card';
import ItemDetail from './../itemList/item/itemDetail';
import { IItem } from '../../interfaces/item';
import path from '../../router/path';
import './confirmOrder.css';

interface ItemProps {
    item: IItem;
    orderDetails: {
        fullName: string;
        orderId: string;
        emailId: string;
    };
}

const Item: React.FC<ItemProps> = (Props) => {
    const navigate = useNavigate();
    const { item, orderDetails } = Props;

    return (
        <Card key={item?.id}>
            <h3>Order confirmation</h3>
            <div className='order-info'>
                <div>
                    Thank you <b>{orderDetails.fullName}</b>, for palcing order! The order details will be sent to your email Id <b>{orderDetails.emailId}</b>.
                </div>
            </div>
            <div className='flex-end order-number pt-5'>Order Number: {orderDetails.orderId}</div>
            <div className='flex-end order-number pt-5'>Total Amount: ${item.actualPrice}</div>
            <ItemDetail item={item} />
            <div className='flex-end'>
                <button className='buy-button' onClick={() => navigate(path.home)}>Continue Shopping</button>
            </div>
        </Card>
    );
};

export default memo(Item);