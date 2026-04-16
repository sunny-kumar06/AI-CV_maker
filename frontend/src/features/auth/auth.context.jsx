// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState, useEffect } from "react";
// import { getMe } from "./services/auth.api.js";


// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const data = await getMe();
//       setUser(data.user);
//       setLoading(false);
//     };

//     fetchUser();
//   }, []);


//   return (
//     <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default AuthProvider;
// export { AuthContext, useAuth };

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.log("User not logged in");
        setUser(null); // 🔥 VERY IMPORTANT
      } finally {
        setLoading(false); // 🔥 ALWAYS RUN
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { AuthContext, useAuth };