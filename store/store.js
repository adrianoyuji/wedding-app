import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./User/slice";
import familyReducer from "./Family/slice";
import giftReducer from "./Gift/slice";

export function makeStore() {
  return configureStore({
    reducer: { user: userReducer, family: familyReducer, gift: giftReducer },
  });
}

const store = makeStore();

export default store;
