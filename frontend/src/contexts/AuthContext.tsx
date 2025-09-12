import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// User interface
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "citizen" | "municipal_admin";
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to hydrate from localStorage (non-authoritative)
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        // If there is no token at all, treat as unauthenticated and avoid hitting profile
        if (!storedToken) {
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // Authoritative check with backend using cookie
        try {
          const profileRes = await fetch("http://localhost:5000/api/users/profile", {
            method: "GET",
            credentials: "include",
            headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
          });

          if (profileRes.ok) {
            const profile = await profileRes.json();
            localStorage.setItem("user", JSON.stringify(profile));
            localStorage.setItem("isAuthenticated", "true");
            setUser(profile);
            setIsAuthenticated(true);
          } else if (profileRes.status === 401 || profileRes.status === 403) {
            // Not authorized: treat as normal unauthenticated state without throwing/logging
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            setUser(null);
          } else {
            // Other non-OK responses: be conservative and mark unauthenticated
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (_) {
          // Network or unexpected error: don't throw, just mark unauthenticated silently
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        // Swallow expected init errors; do not throw
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, role: string) => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      // Try to parse response, but backend may not send token/user
      const data = await response.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        // We have trustworthy user data; mark authenticated without extra fetch
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      } else {
        // Backend didn't return user; fetch profile once using freshest token
        const freshestToken: string | null = data?.token || localStorage.getItem("token");
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
          headers: freshestToken ? { Authorization: `Bearer ${freshestToken}` } : undefined,
        });
        if (!profileRes.ok) {
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
          throw new Error("Profile fetch failed");
        }
        const profile = await profileRes.json();
        localStorage.setItem("user", JSON.stringify(profile));
        localStorage.setItem("isAuthenticated", "true");
        setUser(profile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }

      const data = await response.json(); 

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        // We have trustworthy user data; mark authenticated without extra fetch
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      } else {
        // Fallback: perform a single profile fetch using freshest token
        const freshestToken: string | null = data?.token || localStorage.getItem("token");
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
          headers: freshestToken ? { Authorization: `Bearer ${freshestToken}` } : undefined,
        });
        if (!profileRes.ok) {
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
          throw new Error("Profile fetch failed");
        }
        const profile = await profileRes.json();
        localStorage.setItem("user", JSON.stringify(profile));
        localStorage.setItem("isAuthenticated", "true");
        setUser(profile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
