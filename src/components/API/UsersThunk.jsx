import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    usersData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
    "users/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/auth");
            if (!response.ok) {
                throw new Error("something went wrong while fetching users Data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Adding New Users
export const AddingUsers = createAsyncThunk(
    "users/AddingUsers",
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new users Data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Deleting Users
export const deletingUser = createAsyncThunk(
    "users/deletingUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting users Data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Updating Users
export const updatingUser = createAsyncThunk(
    "users/updatingUser",
    async ({ id, updatedUser }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating users Data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearAllUsers: (state) => {
            state.usersData = [];
            state.isLoading = false;
            state.addLoading = false;
            state.deleteLoading = false;
            state.updateLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usersData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Adding new users
            .addCase(AddingUsers.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingUsers.fulfilled, (state, action) => {
                state.addLoading = false;
                state.usersData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingUsers.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            // Deleting users
            .addCase(deletingUser.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deletingUser.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.usersData = state.usersData.filter((user) => user.id !== action.payload);
                state.error = null;
            })
            .addCase(deletingUser.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            // Updating users
            .addCase(updatingUser.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updatingUser.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.usersData = state.usersData.map((user) => user.id === action.payload.id ? action.payload : user);
                state.error = null;
            })
            .addCase(updatingUser.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export default UsersSlice.reducer;