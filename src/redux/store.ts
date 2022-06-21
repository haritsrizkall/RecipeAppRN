import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer  from "./reducers";
import { configureStore } from '@reduxjs/toolkit'
import Reactotron from "../../ReactotronConfig";

// export const store = createStore(reducer, applyMiddleware(thunk))
const middleware = applyMiddleware(thunk)
export const store = createStore(reducer, compose(middleware, Reactotron.createEnhancer!()))
// const store = configureStore({ reducer, middleware: [thunk] })
export type RootStore = ReturnType<typeof reducer>
