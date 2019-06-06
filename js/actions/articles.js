import * as types from "./types";
import * as variables from "./constant";
import axios from 'axios';

 import {
     AsyncStorage,
 } from 'react-native';

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

 export function getArticles(page, filters) {

     var title = filters && filters.title ? filters.title : '';
     var filterUrl = title ? `&search=${title}` : '';

     return async(dispatch, getState) => {
         try {
             const result = await fetch(
                 `${variables.BACKEND_SERVER}/products/?${limit(10, page)}${filterUrl}`, {
                     method: "GET",
                     headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json",
                         "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                         "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                     }
                 }

                 
             ).then(res => res.json());

             if (result.results) {
                 dispatch(
                     getUserProduct({
                         articles: result.results,
                         count: result.count,
                         next: result.next,
                         previous: result.previous,
                         error: null,
                     })
                 );
             } else {
                dispatch(getUserProduct({error: result}));
             }

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


 export function getUserProduct({
     articles,
     count,
     next,
     previous,
     error,
 }) {
     return {
         type: types.ARTICLES_LOAD,
         articles,
         count,
         next,
         previous,
         error,
     };
 }




 export function createArticle(formData) {

     return async(dispatch, getState) => {
         try {
            const result = axios.post(`${variables.BACKEND_SERVER}/products/`, formData,
                { headers: {
                        "Accept": "application/json",
                        "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                        "Content-Type": "multipart/form-data;",
                        "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                    },
                    onUploadProgress: ({ total, loaded }) => {
                        if (total !== null) {
                            progressData = Math.round(loaded / total);
                            dispatch( SendingPostProgress({ percent: progressData }) );
                        }
                    }

                }).then(res =>
                    dispatch(createProduct({article: res}))
                ).catch(error =>
                    dispatch(createProduct({error: error.response.data}))
                );

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }

 export function createProduct({
     article,
     error,
 }) {
     return {
         type: types.ARTICLE_CREATED,
         article,
         error,
     };
 }

 export function SendingPostProgress({
     percent,
 }) {
     return {
         type: types.UPLOAD_PROGRESS,
         percent,
     };
 }



  export function getTagsList() {
     return async(dispatch, getState) => {
         try {
             const result = await fetch(
                 `${variables.BACKEND_SERVER}/tags/`, {
                     method: "GET",
                     headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json",
                         "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                         "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                     }
                 }
             ).then(res => res.json());

             if (result.results) {
                 dispatch(
                     getTags({
                         tags: result.results,
                     })
                 );
             }

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


 export function getTags({
     tags,
 }) {
     return {
         type: types.TAGS_LOAD,
         tags,
     };
 }



 export function deleteArticle(articleId) {

     return async(dispatch, getState) => {
         try {
            const result = axios.delete(`${variables.BACKEND_SERVER}/products/${articleId}/`,
                { headers: {
                            "Accept": "application/json",
                            "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                          },
                }).then(res =>
                    dispatch(deleteProduct({status: res.status}))
                ).catch(error => {
                    dispatch(deleteProduct({error: error.response.data}))
                });

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


export function deleteProduct({
     status,
     error,
 }) {
     return {
         type: types.ARTICLE_DELETED,
         status,
         error,
     };
 }




 export function updateArticle(id, formData) {

     return async(dispatch, getState) => {
         try {
            const result = axios.put(`${variables.BACKEND_SERVER}/products/${id}/`, formData,
                { headers: {
                        "Accept": "application/json",
                        "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                        "Content-Type": "multipart/form-data;",
                        "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                    },
                    onUploadProgress: ({ total, loaded }) => {
                        if (total !== null) {
                            progressData = Math.round(loaded / total);
                            dispatch( SendingPostProgress({ percent: progressData }) );
                        }
                    }

                }).then(res =>
                    dispatch(updateProduct({article: res}))
                ).catch(error => {
                    dispatch(updateProduct({error: error.response.data}))
                });

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


 export function updateProduct({
     article,
     error,
 }) {
     return {
         type: types.ARTICLE_UPDATE,
         article,
         error,
     };
 }




  export function onDeleteMedia(articleId, formData) {

     return async(dispatch, getState) => {
         try {
            const result = axios.put(`${variables.BACKEND_SERVER}/products/${articleId}/`, formData,
                { headers: {
                            "Accept": "application/json",
                            "X-CSRFToken": await AsyncStorage.getItem('csrf'),
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + await AsyncStorage.getItem('jwtoken'),
                          },
                }).then(res =>
                    dispatch(deleteMedia({article: res}))
                ).catch(error => {
                    dispatch(deleteMedia({error: error.response.data}))
                });

         } catch (error) {
             console.error(error);
             return error;
         }
     };
 }


export function deleteMedia({
     article,
     error,
 }) {
     return {
         type: types.MEDIA_DELETED,
         article,
         error,
     };
 }