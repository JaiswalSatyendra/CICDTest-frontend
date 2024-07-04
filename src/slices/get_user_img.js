import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import axios from 'axios';

const initialState = {
    userProfileImg: { profile_image: "", cover_image: "" }
};

const slice = createSlice({
    name: "profileImg",
    initialState,
    reducers: {
        getEvents(state, action) {
            // const { userProfileImg } = action.payload;
            state.userProfileImg = action.payload;
        },
    },
});

export const reducer = slice.reducer;

export const getEvents1 = () => async (dispatch) => {
    // const response = await axios.get(
    //     `${process.env.REACT_APP_API_URL}/user/getUserImages`,
    //     { withCredentials: true }
    // );
    // const { cover_image, profile_image } = response.data.user;
    // await dispatch(slice.actions.getEvents({ cover_image, profile_image }));
};
export default slice;
