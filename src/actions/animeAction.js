import {
    GET_ANIME_START,
    GET_ANIME_SUCESS,
    GET_ANIME_FAIL,
    GET_ANIME_DETAILS_START,
    GET_ANIME_DETAILS_SUCESS,
    GET_ANIME_DETAILS_FAIL
} from '../constant/action_constant';
import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    headers: {
        'Content-Type': 'application/json',
    },
});

const controller = new AbortController();

export const fetchAnimeList = (data = null) => (dispatch) => {
    dispatch({ type: GET_ANIME_START });
    const { searchValue, limit, page } = data;
    let url = `/anime?limit=${limit}&page=${page}`;

    if (!_.isEmpty(searchValue)) {
        url += '&q=' + searchValue;
    }

    axiosInstance.get(url, { signal: controller.signal })
        .then((res) => {
            dispatch({ type: GET_ANIME_SUCESS, data: res?.data?.data ?? {}, pagination: res?.data?.pagination ?? {} });
        })
        .catch((err) => {
            dispatch({ type: GET_ANIME_FAIL, data: {}, pagination: {} });
            let messages = err?.response?.data?.messages ?? {};
            Object.values(messages).map((category) => {
                category.map((error) => {
                    toast(error);
                });
            });
        });
}

export const fetchAnimeDetails = (id) => (dispatch) => {
    let url = `/anime/${id}`;
    dispatch({ type: GET_ANIME_DETAILS_START });
    axiosInstance.get(url, { signal: controller.signal })
        .then((res) => {
            dispatch({ type: GET_ANIME_DETAILS_SUCESS, data: res?.data?.data ?? {} });
        })
        .catch((err) => {
            dispatch({ type: GET_ANIME_DETAILS_FAIL });
            let messages = err?.response?.data?.messages ?? {};
            Object.values(messages).map((category) => {
                category.map((error) => {
                    toast(error);
                });
            });
        });

}