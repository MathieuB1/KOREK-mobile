import * as types from "./types";
import * as variables from "./constant";
import axios from 'axios';

import {
    AsyncStorage,
} from 'react-native';

export function getUserRegister() {
     return async(dispatch, getState) => {
         try {
             const result = await fetch(
                 `${variables.BACKEND_SERVER}/register/`, {
                     method: "GET",
                     headers: {
                         Accept: "application/json",
                         "Content-Type": "application/json",
                         "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                         "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                     }
                 }
             ).then(res => res.json());

             if (result.results) {
                 dispatch(
                     setUserProfile({
                         userRegisterInfo: result.results[0],
                         username: result.results[0].username
                     })
                 );
             }

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }

export function setUserProfile({
     userRegisterInfo,
     username
    }) {
     return {
         type: types.REGISTER_PAGE_LOAD,
         userRegisterInfo,
         username
     };
}


export function getUserProfile(username) {
     return async(dispatch, getState) => {
         try {
             const result = await fetch(
                 `${variables.BACKEND_SERVER}/profiles/?profile__user__username=${username}`, {
                     method: "GET",
                     headers: {
                         Accept: "application/json",
                         "Content-Type": "application/json",
                         "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                         "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                     }
                 }
             ).then(res => res.json());

             if (result.results) {
                 dispatch(
                     setUserPicture({
                         currentUserImage: result.results[0].image,
                         userProfileInfo: result.results[0],
                     })
                 );
             }

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


 export function setUserPicture({
     currentUserImage,
     userProfileInfo,
 }) {
     return {
         type: types.SETTING_PAGE_LOAD,
         currentUserImage,
         userProfileInfo,
     };
 }




 export function updateProfile(formData, userid, logout) {

     return async(dispatch, getState) => {
         try {

            const result = axios.put(`${variables.BACKEND_SERVER}/register/${userid}/`, formData,
                { headers: {
                        "Accept": "application/json",
                        "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                        "Content-Type": "multipart/form-data;",
                        "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                    },
                    onUploadProgress: ({ total, loaded }) => {
                        if (total !== null) {
                            var progressData = Math.round(loaded / total);
                            dispatch( SendingUpdateProgress({ percent: progressData }) );
                        }
                    }

                }).then(res =>
                    dispatch(updateUserInfo({profile: res, logout: logout}))
                ).catch(error =>
                    dispatch(updateUserInfo({error: error.response.data}))
                );

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }

export function updateUserInfo({
    profile,
    logout,
    error,
}) {
    return {
        type: types.PROFILE_UPDATE,
        profile,
        logout,
        error,
    };
}

export function SendingUpdateProgress({
    percent,
}) {
    return {
        type: types.UPLOAD_SETTING_PROGRESS,
        percent,
    };
}


export function performSettingRefresh() {
    return dispatch => {
        dispatch({
            type: types.SETTING_PAGE_UNLOAD,
        });
    };
}