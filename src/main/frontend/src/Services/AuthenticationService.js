import http from "../http-common";

const signin = async (data) => {

  return await http.post("/api/auth/signin", data)
    .then(response => {

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("role", response.data.roles);
        localStorage.setItem("department", (response.data.department));
        
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};



const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
export default {
  signin,
  logout,
  getCurrentUser,
};

