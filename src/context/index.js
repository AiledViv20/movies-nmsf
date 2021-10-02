import React, { createContext, useReducer } from 'react';
import { initialState } from "./constants";
import { reducer } from "./reducer";

export const ActorFilterContext = createContext();

const ActorFilterProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return ( 
        <ActorFilterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ActorFilterContext.Provider>
    );
}
 
export default ActorFilterProvider;