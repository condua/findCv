export const POST_VERIFY_REQUEST = "POST_VERIFY_REQUEST"
export const POST_VERIFY_SUCCESS = "POST_VERIFY_SUCCESS"
export const POST_VERIFY_FAILUER = "POST_VERIFY_FAILURE"

export const postVerifyRequest = (email, otp) => ({
    type: POST_VERIFY_REQUEST,
    payload: {email, otp},
  });

  export const postOtpSuccess = (data) => ({
    type: POST_VERIFY_SUCCESS,
    payload: {data},
  });

  export const postOtpFailure = (error) => ({
    type: POST_VERIFY_FAILUER,
    payload: {otp},
  });