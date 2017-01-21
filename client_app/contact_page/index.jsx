/**
 * Created by lengung on 25/03/2016.
 */
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

const rootEl = document.getElementById('root');
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        < App/>
    </Provider>
    ,rootEl);
