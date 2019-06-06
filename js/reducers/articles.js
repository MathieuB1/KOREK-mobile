import * as types from "../actions/types";

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export function articlesInfo(state = {}, action) {
    switch (action.type) {
        case types.ARTICLES_LOAD:
            return {...state,
                articles: action.previous ? state.articles.concat(action.articles).filter(onlyUnique) : action.articles,
                article: null,
                count: action.count,
                next: action.next,
                previous: action.previous,
                status: null,
                errors: action.articles ? null : action.error,
            };
        case types.ARTICLE_UPDATE:
        case types.ARTICLE_CREATED:
            return {...state,
                article: action.article ? action.article.data : null,
                percent: 0,
                errors: action.article ? null : action.error,
                status: null
            };
        case types.MEDIA_DELETED:
            return {...state,
                status: action.article.status == 200 ? action.status : null,
                errors: action.article.status == 200 ? null : action.error,
                article: action.article ? action.article.data : null,
                percent: 0
            };
        case types.ARTICLE_DELETED:
            return {...state,
                status: action.status == 204 ? action.status : null,
                errors: action.status == 204 ? null : action.error,
            };
        case types.UPLOAD_PROGRESS:
            return {...state,
                percent: action.percent,
                article: null,
            };
        case types.TAGS_LOAD:
            return {...state,
                tags: action.tags,
            };
        default:
            return state;
    }
}