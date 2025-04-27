import { configureStore } from "@reduxjs/toolkit";
import   Userinformation from '../store/Slice/userdetails.js'
import chats from '../store/Slice/chats.js'

const store = configureStore({
  reducer: {
    UserDetails:Userinformation,
    chatsInfo:chats
  },
});

export default store; 
