 import * as types from "./types";
 import * as variables from "./constant";

 import { AsyncStorage } from 'react-native';

 export function getCsrfToken() {

     function getCsrfCookie(text) {
         var cookieValue = null;
         //console.log(text);
         if (text !== undefined) {
             var csrf_token = text.match(/name="csrfmiddlewaretoken" value="(.*)"/);
             if (csrf_token !== null && csrf_token.length === 2) {
                 cookieValue = csrf_token[1];
             }
             AsyncStorage.setItem('csrf', cookieValue);
         }
         else {
             console.log("Website cannot be reached!");
         }
         return cookieValue;
     }

     return async(dispatch, getState) => {
         try {
             const result = await fetch(
                 `${variables.BACKEND_SERVER}/api-auth/login/`, {
                     method: "GET",
                     headers: {
                         Accept: "application/json",
                         "Content-Type": "application/json"
                     }
                 }
             ).then(res => getCsrfCookie(res._bodyText));

             dispatch(
                 setCsrfToken({
                     csrf: result,
                 })
             );

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }

 export function setCsrfToken({
     csrf,
 }) {
     return {
         type: types.REQUEST_CSRF,
         csrf,
     };
 }