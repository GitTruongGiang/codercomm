import { createContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import apiService from "../app/apiService";
import { isValidToken } from "../utills/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext({ ...initialState });

const LOGIN_SUCCESS = "LOGIN.SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT.SUCCESS";
const REGISTER = "REGISTER";
const INITIALIZED = "INITIALIZED";
const UPDATEPROFILE = "UDATEPROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZED:
      console.log(action.payload);
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isInitialized: true, isAuthenticated };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case UPDATEPROFILE:
      const {
        name,
        avatarUrl,
        coverUrl,
        aboutMe,
        city,
        country,
        company,
        jobTitle,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
          avatarUrl,
          coverUrl,
          aboutMe,
          city,
          country,
          company,
          jobTitle,
          facebookLink,
          instagramLink,
          linkedinLink,
          twitterLink,
        },
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    //req={header:{Authorization: "Bearer f;alskdfjaslfkjas;lfkjas;lfkas;flksaf;sdlkfj"}, body:{}}
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateProfile } = useSelector((state) => state.user);

  useEffect(() => {
    const initialized = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data;
          dispatch({
            type: INITIALIZED,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZED,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZED,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialized();
  }, []);

  useEffect(() => {
    if (updateProfile) {
      dispatch({ type: UPDATEPROFILE, payload: updateProfile });
    }
  }, [updateProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;
    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users", { name, email, password });
    const { user, accessToken } = response.data;
    setSession(accessToken);
    dispatch({ type: REGISTER, payload: { user } });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT_SUCCESS });
    callback();
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
