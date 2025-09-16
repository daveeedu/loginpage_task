import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
    id: number;
    username: string;
    email?: string;
    token: string;
    fistName: string,
    lastName: string,
    gender: string,
    image: string,
}

interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
} 

const initialState: AuthState = {
    user: localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser") as string) : null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<AuthUser, { username: string; email?: string | null; password: string; rememberMe?: boolean }, { rejectValue: string }>(
    "auth/loginUser",
    async ({ username, email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email: email || undefined,
                    expiresInMins: 30,
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.message || "Failed to login");
            }

            const data = await res.json();
            const user: AuthUser = {
                id: data.id,
                username: data.username,
                email: data.email,
                token: data.accessToken,
                fistName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                image: data.image,
            };

            if (rememberMe) {
                localStorage.setItem("authUser", JSON.stringify(user));
            }
            
            return user;
        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("authUser");
        },
        autoLogin: (state) => {
            const savedUser = localStorage.getItem("authUser");
            if (savedUser) {
                state.user = JSON.parse(savedUser);
        }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
                state.loading = false;
                console.log(action.payload);
                state.user = action.payload;
            localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to login";
            });
    },
});

export const { logout, autoLogin } = authSlice.actions;
export default authSlice.reducer;