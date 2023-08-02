export const POST_OTP_REQUEST = "POST_OTP_REQUEST"
export const POST_OTP_SUCCESS = "POST_OTP_SUCCESS"
export const POST_OTP_FAILURE = "POST_OTP_FAILURE"

export const postOtpRequest = (email) => ({
    type: POST_OTP_REQUEST,
    payload: {email},
  });

  export const postOtpSuccess = (otp) => ({
    type: POST_OTP_SUCCESS,
    payload: {otp},
  });

  export const postOtpFailure = (error) => ({
    type: POST_OTP_FAILURE,
    payload: {otp},
  });