export const saveUserSession = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    console.log("Session saved:", { user, token });
  };
  
  export const getUserSession = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");
    console.log("Retrieved session:", { user, token });
    return { user, token };
  };
  
  export const clearSession = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  