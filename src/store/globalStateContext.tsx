// GlobalStateContext.tsx
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { IItem } from '../interfaces/item';

// State types
type State = {
    items: IItem[];
    searchTerm: string;
    sortField: 'name' | 'price' | null;
    sortOrder: 'asc' | 'desc';
    showSearchBox: boolean;
    orderDetails: { [key: string]: any };
};

// Action types
type Action =
    | { type: 'SET_ITEMS'; payload: IItem[] }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SORT_ITEMS'; payload: 'name' | 'price' }
    | { type: 'SET_SEARCH_BOX'; payload: boolean }
    | { type: 'SET_ORDER_DETAILS'; payload: any };

const initialState: State = {
    items: [],
    searchTerm: '',
    sortField: null,
    sortOrder: 'asc',
    showSearchBox: false,
    orderDetails: {},
};

const reducer = (state: State, action: Action): State => {

    switch (action.type) {
        // As we have less data we are storing this data in the state itself
        // if lagre data then we can use pagination and store page data in the state
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SEARCH_BOX':
            return { ...state, showSearchBox: action.payload };
        case 'SORT_ITEMS':
            const sortOrder = state.sortField === action.payload && state.sortOrder === 'asc' ? 'desc' : 'asc';
            const sortedItems = [...state.items].sort((a, b) => {
                if (action.payload === 'name') {
                    return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                } else if (action.payload === 'price') {
                    return sortOrder === 'asc' ? a.actualPrice - b.actualPrice : b.actualPrice - a.actualPrice;
                }
                return 0;
            });
            return { ...state, items: sortedItems, sortField: action.payload, sortOrder };
        case 'SET_ORDER_DETAILS': {
            return { ...state, orderDetails: action.payload };
        }
        default:
            return state;
    }
};

const GlobalStateContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => React.useContext(GlobalStateContext);