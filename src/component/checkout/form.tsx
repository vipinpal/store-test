import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormData, IFormErrors } from '../../interfaces';
import { useGlobalState } from '../../store/globalStateContext';
import './checkout.css';
import path from '../../router/path';

interface CheckoutFormProps {
    itemId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ itemId }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useGlobalState();
    const [formData, setFormData] = useState<IFormData>({
        fullName: '',
        email: '',
        phone: '',
        creditCard: '',
        address: ''
    });

    const [errors, setErrors] = useState<IFormErrors>({});

    // validate the form data
    const validate = (): boolean => {
        let newErrors: IFormErrors = {};

        // check if the full name contains only letters
        if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
            newErrors.fullName = 'Full Name should only contain letters.';
        }

        // check if the email is in the correct format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        // check if the phone number is in the correct format
        if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be in xxx-xxx-xxxx format.';
        }

        // check if the credit card number is in the correct format
        if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(formData.creditCard)) {
            newErrors.creditCard = 'Credit card must be in XXXX-XXXX-XXXX-XXXX format.';
        }

        // check if the address is not empty
        if (!formData.address.trim()) {
            newErrors.address = 'Address cannot be empty.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handle input change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }, [formData]);

    // handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if the form is valid then navigate to the confirmation page
        if (validate()) {
            let orderDetails = { ...state.orderDetails };
            let prevOrderId = Object.keys(state.orderDetails || {}).pop();
            let orderId = prevOrderId ? parseInt(prevOrderId) + 1 : 1;
            orderDetails[orderId] = { ...formData, itemId };

            dispatch({ type: 'SET_ORDER_DETAILS', payload: orderDetails });
            navigate(`${path.confirmation}/${orderId}`);
        }
    };

    // handle credit card input change
    const handleCreditCardChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        // remove all non-digit characters
        let value = event.target.value.replace(/\D/g, '');

        // add hyphens after every 4 characters
        value = value.match(/.{1,4}/g)?.join('-') || '';

        // remove the last hyphen
        if (value.length > 19) {
            value = value.slice(0, 19);
        }
        setFormData({ ...formData, [event.target.name]: value });
    }, [formData]);

    // handle phone input change
    const handlePhoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        // remove all non-digit characters
        let value = event.target.value.replace(/\D/g, '');

        // add hyphens after 3 characters
        if (value.length > 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }

        // add hyphens after 7 characters
        if (value.length > 7) {
            value = value.slice(0, 7) + '-' + value.slice(7);
        }

        // remove the last hyphen
        if (value.length > 12) {
            value = value.slice(0, 12);
        }
        setFormData({ ...formData, [event.target.name]: value });
    }, [formData]);

    return (
        <form className='form' onSubmit={handleSubmit}>
            <header>
                <h3 className='header-title'>Billing Information</h3>
            </header>
            <div className='form-item-grid'>
                <div>
                    <input className='form-input' type='text' name='fullName' placeholder='Full Name' value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <div className='error'>{errors.fullName}</div>}
                </div>
                <div>
                    <input className='form-input' type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                    {errors.email && <div className='error'>{errors.email}</div>}
                </div>
                <div>
                    <input className='form-input' type='text' name='phone' placeholder='Phone (xxx-xxx-xxxx)' value={formData.phone} onChange={handlePhoneChange} />
                    {errors.phone && <div className='error'>{errors.phone}</div>}
                </div>
                <div>
                    <input className='form-input' type='text' name='creditCard' placeholder='Credit Card (XXXX-XXXX-XXXX-XXXX)' value={formData.creditCard} onChange={handleCreditCardChange} />
                    {errors.creditCard && <div className='error'>{errors.creditCard}</div>}
                </div>
                <div>
                    <input className='form-input' name='address' placeholder='Address' value={formData.address} onChange={handleChange}></input>
                    {errors.address && <div className='error'>{errors.address}</div>}
                </div>
            </div>
            <div className='submit-button-container'>
                <button onClick={() => navigate(path.home)}>Back</button>
                <button type='submit'>Submit Order</button>
            </div>
        </form>
    );
};

export default CheckoutForm;