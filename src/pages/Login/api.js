import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      ...error,
      message: error.response?.data?.error || 'Đã có lỗi xảy ra.',
    };
    return Promise.reject(customError);
  }
);

export default api;
