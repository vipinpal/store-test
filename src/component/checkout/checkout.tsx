import React, { memo } from 'react';
import Card from '../card/card';
import ItemDetail from './../itemList/item/itemDetail';
import Form from './form';
import { IItem } from '../../interfaces/item';
import './checkout.css';

interface ItemProps {
    item: IItem;
}

const Item: React.FC<ItemProps> = (Props) => {
    const { item } = Props;

    return (
        <Card key={item.id}>
            <h3>Secure Checkout</h3>
            <ItemDetail item={item} />
            <div className='divider' />
            <Form itemId={item.id || ''} />
        </Card>
    );
};

export default memo(Item);