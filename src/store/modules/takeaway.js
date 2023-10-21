import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const foodStore = createSlice({
    name: 'foods',
    initialState: {
        // 商品列表
        foodsList: [],
        // 菜單標籤狀態
        activeIndex: 0,
        // 購物車列表
        cartList: []
    },
    reducers: {
        // 更改商品列表
        setFoodList(state, action) {
            state.foodsList = action.payload;
        },
        // 勾改activeIndex
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload;
        },
        // 添加至購物車
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            if (item) {
                item.count++
                console.log(item.count);
            } else {
                state.cartList.push(action.payload)
            }
        },
        // count增加
        addCounter(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // count減少
        subCounter(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if(item.count === 0){
                return
            }
            item.count--
        },
        // 清除購物車
        clearCart(state,action){
            state.cartList = []
        }
    }
});
const { setFoodList } = foodStore.actions;

export const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway');
        dispatch(setFoodList(res.data))
    }
}

export const { changeActiveIndex, addCart, addCounter, subCounter ,clearCart} = foodStore.actions