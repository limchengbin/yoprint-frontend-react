import {
    GET_ANIME_START,
    GET_ANIME_SUCESS,
    GET_ANIME_FAIL, GET_ANIME_DETAILS_START,
    GET_ANIME_DETAILS_SUCESS,
    GET_ANIME_DETAILS_FAIL
} from '../constant/action_constant';


const initialState = {
    loading: true,
    animeList: {},
    animePagination: {},
    animeDetails: {},
};

export default function animeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ANIME_START:
            return { ...state, loading: true };
        case GET_ANIME_SUCESS:
            return { ...state, animeList: action.data, animePagination: action.pagination, loading: false };
        case GET_ANIME_FAIL:
            return { ...state, loading: false, animeList: {}, animePagination: {} };
        case GET_ANIME_DETAILS_START:
            return { ...state, loading: true };
        case GET_ANIME_DETAILS_SUCESS:
            return { ...state, loading: false, animeDetails: action.data };
        case GET_ANIME_DETAILS_FAIL:
            return { ...state, loading: false, animeDetails: {} };
        default:
            return state;
    }
}