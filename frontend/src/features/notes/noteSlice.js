import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const submitNote= createAsyncThunk(
  
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    createNote: (state, action) => {
            
    },
    editNote: (state, action) => {
      
    },
    fetchNote: (state, action) => {
      
    },
    deleteNote: (state, action) => {
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { createNote, editNote, fetchNote,  deleteNote} = noteSlice.actions

export default noteSlice.reducer