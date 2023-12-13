import {
    createContext, useReducer
} from "react";


const INITIAL_STATE = {
    city: undefined,
    date: [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          }
    ],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            console.log("action ", action.payload)
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state
    }
};

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
console.log("state " , state);
    return (
        <SearchContext.Provider 
        value={{
            city: state.city,
            date: state.date,
            options: state.options,
            dispatch
        }}
        >
            {children}
        </SearchContext.Provider>
    )
};