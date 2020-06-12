import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';//for persist
import { partners } from './partners';
import { favorites } from './favorites';

const config = {//pt 1 of persist
    key: 'root',//req
    storage,//req
    debug: true
}
export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config,{//pt 2 of persist
       // combineReducers({ //creates 1 single root reducer
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
const persistor = persistStore(store);// pt 3 to enable the sore to be persisted
    return {persistor, store};
}