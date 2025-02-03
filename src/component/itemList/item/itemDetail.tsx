import React, { memo } from 'react';
import { IItem } from '../../../interfaces/item';
import './item.css';

interface ItemProps {
    item: IItem;
    hideBuy?: boolean;
}

const ItemDetail: React.FC<ItemProps> = (Props) => {
    const { item } = Props;

    return (
        <div className='item'>
            <div>
                <img src={item?.imageUrl} alt='Item' />
            </div>
            <div className='item-details'>
                <div className='item-text-detail'>
                    <div className='item-name'>{item?.title}</div>
                    <div className='item-description'>{item?.description}</div>
                    <div className='item-price line-through'>Suggested Price: ${item?.suggestedPrice}</div>
                    <div className='item-price'>Actual Price: ${item?.actualPrice}</div>
                    <div className='item-discount'>Discount: {(((item?.suggestedPrice - item?.actualPrice) / item?.suggestedPrice) * 100).toFixed(2)}%</div>
                </div>
            </div>
        </div>
    );
};

export default memo(ItemDetail);