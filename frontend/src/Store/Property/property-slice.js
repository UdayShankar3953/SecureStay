//package that will provide you tools to manage redux in react , slice is a collection of reducer function 
import { createSlice } from "@reduxjs/toolkit";

//propertyslice object is created using create slice
const propertySlice= createSlice({

    //Slice name:
    name:"property",
    //Initial state for the property slice 
    initialState: {
        properties:[], //array to hold all fetched properties
        totalProperties:0,
        searchParams:{},//parameters used to search
        error:null,
        loading:false,//loading state
    },
    //functions to handle different functions
    //they modify the state with the dispatched actions
    reducers:{
        getRequest(state){
            state.loading = true;
        },
        //responsible for updating the properties state with fetch data
        getProperties(state, action){
            state.properties = action.payload.data;//update the properties filled 
            state.totalProperties = action.payload.all_properties;
            state.loading = false;//process of fetching the properties has been completed
        },
        //Action to update search parameter 
        updateSearchParams :(state, action) => {
            state.searchParams = 
            Object.keys(action.payload).length === 0 ? {} : {
                ...state.searchParams,
                ...action.payload,
            };
        },
        //Action to update error state
        getErrors(state, action){
            state.error = action.payload;
        },
    },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;