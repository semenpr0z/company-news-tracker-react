import { SET_TOKEN, REMOVE_TOKEN, SET_RESULTS, SET_DOCUMENTS_IDS } from "./types";

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setResults = (data) => ({
  type: SET_RESULTS,
  payload: data
})

export const setDocumentIds = (data) => ({
  type: SET_DOCUMENTS_IDS,
  payload: data
})