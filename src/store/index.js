import { configureStore } from "@reduxjs/toolkit";
import { foodStore } from "./modules/takeaway";

const store = configureStore({
    reducer:{
        foods: foodStore.reducer
    }
})

export default store