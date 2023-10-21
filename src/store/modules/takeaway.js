import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const foodStore  = createSlice({
    name:'foods',
    initialState:{
        // 商品列表
        foodsList:[],
        // 菜單標籤狀態
        activeIndex:0
    },
    reducers:{
        // 更改商品列表
        setFoodList(state,action){
            state.foodsList = action.payload;
        },
        // 勾改activeIndex
        changeActiveIndex(state,action){
            state.activeIndex = action.payload;
        }
    }
});
const {setFoodList} = foodStore.actions;   

export const fetchFoodList = () =>{
    return async(dispatch)=>{ 
        const res = await axios.get('http://localhost:3004/takeaway');
        dispatch(setFoodList(res.data))
    }
}

export const {changeActiveIndex} = foodStore.actions