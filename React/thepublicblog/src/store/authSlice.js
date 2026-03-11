// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    // Call the service
    await authService.login({ email, password });
    // Get user data
    const user = await authService.getCurrentUser();
    return user;
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }) => {
    // Call the service
    await authService.createAccount({ email, password, name });
    // Get user data
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
    // Sync reducers (for direct state updates if needed)
    setUser: (state, action) => {
      state.userData = action.payload;
      state.status = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
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

      // Register
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

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = false;
        state.userData = null;
        state.emailVerified = false;
      })

      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = !!action.payload;
        state.userData = action.payload;
        state.emailVerified = action.payload?.emailVerification || false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
