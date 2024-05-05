import { configureStore } from '@reduxjs/toolkit'
import workflowRedux from './slices/workflowRedux'

export const makeStore = () => {
  return configureStore({
    reducer: {
      workflow: workflowRedux
    }
  })
}