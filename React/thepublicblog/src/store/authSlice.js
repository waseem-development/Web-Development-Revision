// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    await authService.login({ email, password });
    const user = await authService.getCurrentUser();
    return user;
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }) => {
    await authService.createAccount({ email, password, name });
    const user = await authService.getCurrentUser();
    return user;
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
  return null;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const user = await authService.getCurrentUser();
  return user;
});

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerification",
  async () => {
    await authService.sendVerification();
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email }) => {
    await authService.passwordRecovery({ email });
  },
);

export const confirmResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async ({ userId, secret, newPassword }) => {
    await authService.confirmPasswordRecovery(userId, secret, newPassword);
  },
);

const initialState = {
  status: false,
  userData: null,
  loading: false,
  error: null,
  emailVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.status = !!action.payload;
    },
    clearAuth: (state) => {          // ← NEW: sync clear, no API call
      state.status = false;
      state.userData = null;
      state.emailVerified = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
        state.emailVerified = action.payload?.emailVerification || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
        state.emailVerified = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = false;
        state.userData = null;
        state.emailVerified = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = !!action.payload;
        state.userData = action.payload;
        state.emailVerified = action.payload?.emailVerification || false;
      });
  },
});

export const { setUser, clearAuth, clearError } = authSlice.actions;  // ← export clearAuth
export default authSlice.reducer;