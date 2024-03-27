import { createContext } from "react";

export const initState = { //初始化狀態
    type: '',
    title: '',
    text: '',
}

//useContext 跨元件傳遞
export const MessageContext = createContext({})


//Reducer (有一些方法，建立訊息＆刪除訊息)
export const messageReducer = (state, action) => { //state 狀態＆action使用的方法
    switch (action.type) {
        case "POST_MESSAGE":
            return {
                ...action.payload
            };
        case "CLEAR_MESSAGE":
            return {
                ...initState,
            };
        default:
            return state;
    }
}

export function handleSuccessMessage(dispatch, res) {
    dispatch({
        type: "POST_MESSAGE",
        payload: {
            type: 'success',
            title: '更新成功',
            text: res.data.message,
        },
    });
    setTimeout(() => {
        dispatch({
            type: "CLEAR_MESSAGE",
        });
    }, 3000);
}

export function handleErrorMessage(dispatch, error) {
    dispatch({
        type: "POST_MESSAGE",
        payload: {
            type: 'danger',
            title: '更新失敗',
            text: Array.isArray(error?.response?.data?.message)
                ? error?.response?.data?.message.join(`&`) //如果是陣列就改成字串形式呈現
                : error?.response?.data?.message,
        },
    });
    setTimeout(() => {
        dispatch({
            type: "CLEAR_MESSAGE",
        });
    }, 3000);
}