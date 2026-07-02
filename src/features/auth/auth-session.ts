export type AuthSession = {
  email: string;
  role: string;
  name?: string;
};

const AUTH_SESSION_KEY = "adsfixter-auth-session";
const AUTH_ROLE_KEY = "adsfixter-role";

export function setAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  window.localStorage.setItem(AUTH_ROLE_KEY, session.role);
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_SESSION_KEY);

  if (!raw) {
    const role = window.localStorage.getItem(AUTH_ROLE_KEY);

    if (!role) {
      return null;
    }

    return {
      email: "",
      role,
    };
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getAuthSession() !== null;
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.localStorage.removeItem(AUTH_ROLE_KEY);
}
