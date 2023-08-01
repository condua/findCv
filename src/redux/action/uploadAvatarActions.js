export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';

export const uploadAvatarRequest = (accessToken, avatarFile) => ({
  type: UPLOAD_AVATAR_REQUEST,
  payload: { accessToken, avatarFile },
});

export const uploadAvatarSuccess = (avatarUrl) => ({
  type: UPLOAD_AVATAR_SUCCESS,
  payload: { avatarUrl },
});

export const uploadAvatarFailure = (error) => ({
  type: UPLOAD_AVATAR_FAILURE,
  payload: { error },
});