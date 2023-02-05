import React from "react";
import {
  getProfile,
  signIn as signInUser,
  signOut as signOutUser,
} from "src/interface";

export const AuthContext = React.createContext<{
  user: {
    username: string;
  } | null;
  isSigningIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<null | { username: string }>(null);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  React.useDebugValue({ user, isSigningIn });

  const signIn = React.useCallback(
    async (username: string, password: string) => {
      setIsSigningIn(true);
      try {
        await signInUser(username, password);
        setUser({ username });
      } catch (error) {
        console.error(error);
      } finally {
        setIsSigningIn(false);
      }
    },
    []
  );
  const signOut = React.useCallback(() => {
    signOutUser().then(() => {
      setUser(null);
    });
  }, []);

  const context = React.useMemo(
    () => ({ user, signIn, signOut, isSigningIn }),
    [user, signIn, signOut, isSigningIn]
  );

  React.useEffect(() => {
    setIsSigningIn(true);
    getProfile()
      .then((user) => {
        if (user) {
          setUser(user);
        }
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return { ...context, isAuthenticated: !!context.user };
}
