import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterResponse } from "@/types/register";
import { authApi } from "@/lib/api";

interface AuthState {
  user: RegisterResponse | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  sessionExpiry: number | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  sessionExpiry: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await authApi.login(credentials);
      return {
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await authApi.register(userData);
      return {
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (token) {
        await authApi.logout(token);
      }

      return true;
    } catch (error) {
      // Always return true for logout, even if API call fails
      return true;
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshTokenValue = state.auth.refreshToken;

      if (!refreshTokenValue) {
        return rejectWithValue("No refresh token available");
      }

      const data = await authApi.refreshToken(refreshTokenValue);
      return {
        token: data.token,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Token refresh failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.sessionExpiry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
      });

    builder

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
      });

    builder
      .addCase(logoutUser.pending, (state) => {})
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.sessionExpiry = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.sessionExpiry = null;
      });

    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiry = Date.now() + action.payload.expiresIn * 1000;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.sessionExpiry = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
