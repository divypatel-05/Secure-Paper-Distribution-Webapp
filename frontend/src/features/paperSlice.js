import { createSlice } from "@reduxjs/toolkit";

export const paperSlice = createSlice({
    name: "papers",
    initialState: {
        papers: [],
    },
    reducers: {
        addPaper: (state, action) => {
            state.papers = action.payload;
        },
    },
});

export const { addPaper } = paperSlice.actions;
export default paperSlice.reducer;
