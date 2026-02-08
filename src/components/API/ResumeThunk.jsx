import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const StoredResume = localStorage.getItem("resume")
    ? JSON.parse(localStorage.getItem("resume"))
    : null;

export const initialState = {
    resumeData: StoredResume || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetching Resume Data
export const fetchResume = createAsyncThunk(
    "resume/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/resumes");
            if (!response.ok) {
                throw new Error("something went wrong while fetching resume data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Creating new Resume Data
export const AddResume = createAsyncThunk(
    "resume/AddResume",
    async (newResume, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/resumes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newResume),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new resume data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Deleting Resume Data
export const DeleteResume = createAsyncThunk(
    "resume/DeleteResume",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/resumes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting resume data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Updating Resume Data
export const UpdateResume = createAsyncThunk(
    "resume/UpdateResume",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/resumes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating resume data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Fetch Resume By Id
export const fetchResumeByUserId = createAsyncThunk(
    "resume/fetchUserById",
    async (userId, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/resumes?userId=${userId}`);
            if (!response.ok) {
                throw new Error("Something went wrong while fetching user resume");
            };
            const data = await response.json();
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const ResumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        clearAllResumes: (state) => {
            state.resumeData = [];
            state.addLoading = false;
            state.deleteLoading = false;
            state.isLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("resume");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResume.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resumeData = Array.isArray(action.payload)
                    ? action.payload
                    : [action.payload];
                state.error = null;

                localStorage.setItem(
                    "resume",
                    JSON.stringify(state.resumeData)
                );
            })
            .addCase(fetchResume.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Adding New Resume Data
            .addCase(AddResume.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddResume.fulfilled, (state, action) => {
                state.addLoading = false;
                state.resumeData.push(action.payload);
                state.error = null;

                localStorage.setItem(
                    "resume",
                    JSON.stringify(state.resumeData)
                );
            })
            .addCase(AddResume.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            // Deleting Resume Data
            .addCase(DeleteResume.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteResume.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.resumeData = state.resumeData.filter((resume) => resume.id !== action.payload);
                state.error = null;

                localStorage.setItem(
                    "resume",
                    JSON.stringify(state.resumeData)
                );
            })
            .addCase(DeleteResume.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            // Updating Resume Data
            .addCase(UpdateResume.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateResume.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.resumeData = state.resumeData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem(
                    "resume",
                    JSON.stringify(state.resumeData)
                );
            })
            .addCase(UpdateResume.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchResumeByUserId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResumeByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchResumeByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { clearAllResumes } = ResumeSlice.actions;

export default ResumeSlice.reducer;