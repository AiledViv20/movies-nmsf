import axios from "axios";

export const myAxios = ({ data, method, url,responseType, }) => {
  return axios({
    baseURL: "https://whois.nomada.cloud/",
    data,
    method,
    url,
    responseType,
    headers: {
      "Nomada": "YmMwMmJjZTctZmQ0YS00NDY0LThjNWUtN2Y5YTAxZGE0MGYz",
    },
  });
};

export const searchAxios = ({ data, method, url, responseType, }) => {
    return axios({
      baseURL: "https://api.themoviedb.org/3/",
      data,
      method,
      url,
      responseType,
    });
  };
