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
  role: "citizen" | "municipal_admin" | "field_officer";
  address?: string;
  joinDate?: string;
  bio?: string;
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

        // Authoritative check with backend using cookie
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (profileRes.ok) {
          const profile = await profileRes.json();
          localStorage.setItem("user", JSON.stringify(profile));
          localStorage.setItem("isAuthenticated", "true");
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
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
      let data: any = null;
      try {
        data = await response.json();
      } catch (_) {
        // ignore
      }

      console.log("data token", data.token);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      // Only set authenticated if profile fetch succeeds
      try {
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profile = await profileRes.json();
        localStorage.setItem("user", JSON.stringify(profile));
        localStorage.setItem("isAuthenticated", "true");
        setUser(profile);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        throw e;
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

      let data: any = null;
      try {
        data = await response.json();
      } catch (_) {
        // ignore
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        // We at least know basic info from the form
        const minimalUser = { name, email, role } as Partial<User>;
        localStorage.setItem("user", JSON.stringify(minimalUser));
        setUser(minimalUser as User);
      }

      // Only set authenticated if profile fetch succeeds
      try {
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profile = await profileRes.json();
        localStorage.setItem("user", JSON.stringify(profile));
        localStorage.setItem("isAuthenticated", "true");
        setUser(profile);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        throw e;
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
