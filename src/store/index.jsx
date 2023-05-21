import { createStore } from "redux";
import reducer from './reducers';

export  const configureStore = () => {
    const store = createStore(reducer);
    return store
}