import { POST_OTP_REQUEST,POST_OTP_SUCCESS,POST_OTP_FAILURE } from "../action/postOtpAction";

const initialState = {
    message: null,
}

const postOtpReducer = (state = initialState, action) =>{
    switch (action.type){
        case POST_OTP_SUCCESS:
            return{
                ...state,
                message: action.payload.message,
            }
        case POST_OTP_FAILURE:
            return{
                ...state,
                message:action.payload.message,
            }
        default:
            return state;
    }
}

export default postOtpReducer