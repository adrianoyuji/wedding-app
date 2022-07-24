import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../services/agent";

const initialState = {
  list: [],
  status: "idle",
};

export const fetchFamilies = createAsyncThunk("families/fetchAll", async () => {
  return await agent.Families.listAll();
});

export const createFamily = createAsyncThunk(
  "families/create",
  async (newFamily) => {
    return await agent.Families.create(newFamily);
  }
);
export const deleteFamily = createAsyncThunk("families/destroy", async (id) => {
  await agent.Families.delete(id);
  return { id: id };
});

export const updateFamily = createAsyncThunk(
  "families/update",
  async (updatedFamily) => {
    return await agent.Families.update(updatedFamily);
  }
);

export const createGuest = createAsyncThunk(
  "families/newGuest",
  async ({ familyId, member }) => {
    return await agent.Families.createMember(familyId, member);
  }
);

export const deleteGuest = createAsyncThunk(
  "families/deleteGuest",
  async ({ memberId, familyId }) => {
    await agent.Families.destroyMember(familyId, memberId);
    return {
      deleted_id: memberId,
      family_id: familyId,
    };
  }
);

export const Familieslice = createSlice({
  name: "families",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFamilies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.families.map((family) => ({
          ...family,
          id: family._id.toString(),
        }));
      })
      .addCase(fetchFamilies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createFamily.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFamily.fulfilled, (state, action) => {
        state.status = "success";
        state.list = [
          ...state.list,
          {
            ...action.payload.family,
            id: action.payload.family._id.toString(),
          },
        ];
      })
      .addCase(createFamily.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteFamily.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      })
      .addCase(updateFamily.fulfilled, (state, action) => {
        const updatedFamily = {
          ...action.payload.family,
          id: action.payload.family._id.toString(),
        };
        state.list = state.list.map((item) => {
          if (item.id !== updatedFamily.id) return item;
          return updatedFamily;
        });
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        console.log(action.payload);
        state.list = state.list.map((family) => {
          if (family.id !== action.payload.family._id.toString()) return family;

          return {
            ...family,
            members: action.payload.family.members,
          };
        });
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.list = state.list.map((family) => {
          if (family.id !== action.payload.family_id) return family;

          return {
            ...family,
            members: family.members.filter(
              (member) => member.id !== action.payload.deleted_id
            ),
          };
        });
      }),
});

export const selectFamilies = (state) => state.family;

export default Familieslice.reducer;
