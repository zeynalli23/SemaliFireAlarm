export const AUTH_TOKEN_KEY = "semali_admin_token"
export const USER_INFO_KEY = "semali_admin_user"

export const auth = {
  setToken: (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },
  setUser: (user: any) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
  },
  getUser: () => {
    const user = localStorage.getItem(USER_INFO_KEY)
    return user ? JSON.parse(user) : null
  },
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  },
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
  },
}
