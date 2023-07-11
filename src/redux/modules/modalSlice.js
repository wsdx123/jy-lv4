const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  isOpen: false,
  content: ''
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAlert: (state, action) => {
      state.isOpen = true
      state.content = action.payload
    },
    closeAlert: (state, action) => {
      state.isOpen = action.payload
    }
  }
})

export default modalSlice.reducer
export const { openAlert, closeAlert } = modalSlice.actions
