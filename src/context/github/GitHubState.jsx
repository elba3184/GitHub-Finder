import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GitHubState = (props) => {
    //Global state for Github resources
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState);
 
    //Search for GitHub users using GitHub API
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${ process.env.GITHUB_CLIENT_ID }
        &client_secret=${process.env.GITHUB_CLIENT_SECRET }`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    };

    //Get single GitHub user
    const getUser = async (username) => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${ username }?client_id=${ process.env.GITHUB_CLIENT_ID }
        &client_secret=${process.env.GITHUB_CLIENT_SECRET }`
        );

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    };

    //Get repos

    //Clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    //Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
    //Will help provide state globally
    <GitHubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repo,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser
        }}
    >
        {props.children}
    </GitHubContext.Provider>
    );
};

export default GitHubState;

