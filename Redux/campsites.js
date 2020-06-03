import * as ActionTypes from './ActionTypes';

export const campsites = (state = { isLoading: true, //takes the campsite state and returns a default
                                     errMess: null,
                                     campsites: []}, action) => {// the default state is changed and return the correct action message
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};