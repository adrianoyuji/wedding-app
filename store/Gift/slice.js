import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../services/agent";

const initialState = {
  list: [],
  status: "idle",
};

export const fetchGifts = createAsyncThunk("gifts/fetchAll", async () => {
  return await agent.Gifts.listAll();
});

export const createGift = createAsyncThunk("gifts/create", async (newGift) => {
  return await agent.Gifts.create(newGift);
});
export const deleteGift = createAsyncThunk("gifts/destroy", async (id) => {
  await agent.Gifts.delete(id);
  return { id: id };
});

export const updateGift = createAsyncThunk(
  "gifts/update",
  async (updatedGift) => {
    return await agent.Gifts.update(updatedGift);
  }
);

export const giftSlice = createSlice({
  name: "gifts",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchGifts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.gifts.map((gift) => ({
          ...gift,
          id: gift._id.toString(),
        }));
      })
      .addCase(fetchGifts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createGift.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGift.fulfilled, (state, action) => {
        state.status = "success";
        state.list = [
          ...state.list,
          { ...action.payload.gift, id: action.payload.gift._id.toString() },
        ];
      })
      .addCase(createGift.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteGift.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      })
      .addCase(updateGift.fulfilled, (state, action) => {
        const updatedGift = {
          ...action.payload.gift,
          id: action.payload.gift._id.toString(),
        };
        state.list = state.list.map((item) => {
          if (item.id !== updatedGift.id) return item;
          return updatedGift;
        });
      }),
});

export const selectGifts = (state) => state.gift;

export default giftSlice.reducer;
