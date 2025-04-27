import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export type DateTimeFormatOptions = {
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour12: boolean;
};
