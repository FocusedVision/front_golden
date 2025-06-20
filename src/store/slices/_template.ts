// TEMPLATE FILE - Copy this when creating new slices
// Remove this file when you're done adding slices

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
interface ExampleState {
  data: any[];
  selectedItem: any | null;
  isLoading: boolean;
  error: string | null;
  // Add more state properties as needed
}

// Initial state
const initialState: ExampleState = {
  data: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

// Async thunks (for API calls)
export const fetchExampleData = createAsyncThunk(
  "example/fetchData", // Action type
  async (params: { id?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/example${params.id ? `/${params.id}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        return rejectWithValue("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  },
);

// Slice
const exampleSlice = createSlice({
  name: "example", // This should match your slice name
  initialState,
  reducers: {
    // Synchronous actions
    setSelectedItem: (state, action: PayloadAction<any>) => {
      state.selectedItem = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetState: (state) => {
      state.data = [];
      state.selectedItem = null;
      state.isLoading = false;
      state.error = null;
    },

    // Add more reducers as needed
  },
  extraReducers: (builder) => {
    // Handle async thunk states
    builder
      .addCase(fetchExampleData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExampleData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setSelectedItem, clearError, resetState } = exampleSlice.actions;

// Selectors (for easy data access)
export const selectExampleData = (state: { example: ExampleState }) =>
  state.example.data;
export const selectSelectedItem = (state: { example: ExampleState }) =>
  state.example.selectedItem;
export const selectExampleLoading = (state: { example: ExampleState }) =>
  state.example.isLoading;
export const selectExampleError = (state: { example: ExampleState }) =>
  state.example.error;

// Export reducer
export default exampleSlice.reducer;

/*
HOW TO USE THIS TEMPLATE:

1. Copy this file and rename it (e.g., themeSlice.ts, userSlice.ts)
2. Replace "example" with your slice name throughout the file
3. Update the state interface and initial state
4. Add your specific async thunks and reducers
5. Update selectors to match your state structure
6. Add the slice to store/index.ts:
   - Import: import yourSlice from "./slices/yourSlice";
   - Add to rootReducer: yourSliceName: yourSlice,
   - Update persist config whitelist/blacklist as needed
7. Update hooks/redux.ts if you want custom hooks for this slice
8. Create selectors and typed hooks as needed

BEST PRACTICES:
- Keep slice names consistent (camelCase)
- Use descriptive action names
- Handle loading and error states consistently
- Use TypeScript for all interfaces
- Create reusable selectors
- Use createAsyncThunk for API calls
- Keep reducers pure (no side effects)
- Use Immer-style mutations (RTK handles immutability)
*/
