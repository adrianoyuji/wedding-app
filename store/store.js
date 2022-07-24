import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./User/slice";
import familyReducer from "./Family/slice";

export function makeStore() {
  return configureStore({
    reducer: { user: userReducer, family: familyReducer },
  });
}

const store = makeStore();

export default store;
