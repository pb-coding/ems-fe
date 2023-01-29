import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {

            let userToken = localStorage.getItem("userToken")
            if (userToken === null) {
                return Promise.reject(error);
            }
            let refresh_token = JSON.parse(userToken).refresh_token;

            let refreshTokenEndpointResponse = await axios.post("/api/oauth/access_token", {
                grant_type: "refresh_token",
                refresh_token: refresh_token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .catch((err) => {
                return Promise.reject(err);
              });
            localStorage.setItem('userToken', JSON.stringify(refreshTokenEndpointResponse.data))
            
            console.log(error.config)
            return axios(error.config);
        }
        else {
            return Promise.reject(error);
        }
    }
);

export default jwtInterceptor;