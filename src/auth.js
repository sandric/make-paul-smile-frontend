import React from "react";
import {Provider} from "react-redux";
import {configure, authStateReducer} from "redux-auth";
import {createStore, compose, applyMiddleware, combineReducers} from "redux";

export function authorize({store, isServer, cookies, currentLocation} = {}) {
  // configure redux-auth BEFORE rendering the page
  store.dispatch(configure(
    // use the FULL PATH to your API
    {apiUrl: "http://localhost:4000"},
    {isServer, cookies, currentLocation}
  ))
}
