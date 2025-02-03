import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../card/card';
import ItemDetail from './itemDetail';
import { IItem } from '../../../interfaces/item';
import path from '../../../router/path';
import './item.css';

interface ItemProps {
    item: IItem;
}

const Item: React.FC<ItemProps> = (Props) => {
    const navigate = useNavigate();
    const { item } = Props;

    return (
        <Card key={item?.id}>
            <ItemDetail item={item} />
            <div className='item-buy-button'>
                {/* on click of buy button redirecting on checkout page with item Id */}
                <button className='buy-button' onClick={() => navigate(`${path.checkout}?itemId=${item.id}`)}>Buy</button>
            </div>
        </Card>
    );
};

export default memo(Item);