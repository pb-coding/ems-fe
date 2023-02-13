import jwtInterceptor from "./jwtInterceptor";

interface Catfact {
  fact: string;
  length: number;
}

interface EnphaseLoginStatus {
  isUserLoggedIntoEnphase: boolean;
}

async function fetchCatfact(): Promise<Catfact> {
  const response = await fetch("https://catfact.ninja/fact");
  const responseJson = await response.json();
  console.log(responseJson)
  return responseJson;
}

async function fetchEnphaseLoginStatus() {
  let userToken = localStorage.getItem("userToken")
    if (userToken) {
      let accessToken = JSON.parse(userToken).access_token;
  
      const response = await jwtInterceptor.get<EnphaseLoginStatus>("/api/enphase/login_status", {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
      })

      const responseData = await response.data;
      console.log(responseData)
      return responseData;
    }
    return {isUserLoggedIntoEnphase: false}
}

const api = {
  fetchCatfact,
  fetchEnphaseLoginStatus,
};

export default api;