import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "../slices/calendar";
import { reducer as projectsBoardReducer } from "../slices/projects_board";
import { reducer as mailboxReducer } from "../slices/mailbox";
import { reducer as userImgReducer } from "../slices/get_user_img";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  projectsBoard: projectsBoardReducer,
  mailbox: mailboxReducer,
  userImg: userImgReducer,
});

export default rootReducer;
