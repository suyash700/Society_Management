import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));  
    const [user, setUser] = useState("");
    
    // Store token in localStorage and state
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
     return  localStorage.setItem("token", serverToken);
        // setToken(serverToken);
    };

    // Logout user, clear token and user data
    const Logoutuser = () => {
        localStorage.removeItem("token");
        setToken("");
      //  setUser("");  // Clear user state
    };

    // Check if user is logged in (only if a valid token exists)
    let isLoggedIn = !!token ;
    // && token !== "undefined";

    console.log("isLoggedIn:", isLoggedIn);

    // Fetch user data if token is valid
    const userAuthentication = async () => {
        try {
            if (!token || token === "undefined") {
                console.warn("No valid token found, logging out.");
                Logoutuser();
                return;
            }
            console.log("Token before fetch:", token);
            const response = await fetch("http://localhost:4000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization:`Bearer ${token}` ,
                },
            });

            if (!response.ok) {
                console.warn("Invalid token, logging out.");
                Logoutuser();
                return;
            }

            const data = await response.json();
            console.log("User data:", data);
            setUser(data);

        } catch (error) {
            console.error("Error fetching user data:", error);
            Logoutuser();  // Logout if error occurs
        }
    };

    // Run user authentication only if token is present
    useEffect(() => {
        if (token && token !== "undefined") {
            userAuthentication();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, Logoutuser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

export { AuthProvider, useAuth, AuthContext };
