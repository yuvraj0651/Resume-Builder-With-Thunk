import { configureStore } from "@reduxjs/toolkit";
import AuthThunk from "../../API/AuthThunk";
import ResumeThunk from "../../API/ResumeThunk";
import UsersThunk from "../../API/UsersThunk";

const Store = configureStore({
    reducer: {
        auth: AuthThunk,
        resumeData: ResumeThunk,
        users: UsersThunk,
    }
});

export default Store;