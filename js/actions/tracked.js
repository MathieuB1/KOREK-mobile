import * as types from "./types";
import * as variables from "./constant";
import axios from 'axios';

import {
    AsyncStorage,
} from 'react-native';

export function getTrackedArticle(id) {

    return async(dispatch, getState) => {
        try {
            const result = await fetch(
                `${variables.BACKEND_SERVER}/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                        "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                    }
                }

            ).then(res => res.json());

            if (result.id) {
                dispatch(
                    getUserProduct({
                        tracked_article: result,
                        errors: null,
                    })
                );
            } else {
                dispatch(getUserProduct({ errors: result }));
            }

        } catch (error) {
            console.error(error);
            return error;
        }
    };
}

export function getUserProduct({
    tracked_article,
    errors,
}) {
    return {
        type: types.TRACKED_ARTICLE,
        tracked_article,
        errors,
    };
}