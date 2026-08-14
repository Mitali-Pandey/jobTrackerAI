import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Shortcut so pages can just write: const { user, login } = useAuth();
export const useAuth = () => useContext(AuthContext);