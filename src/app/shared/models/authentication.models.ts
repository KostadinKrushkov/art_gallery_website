export interface AuthenticationResponse {
  status_code: number,
  status: string,
  message: string,
  token: string | null,
  id: number | null,
  error: string | null
}

export interface BasicResponse<T> {
  status_code: number,
  status: string,
  message: string,
  json: T,
}

export interface User {
  username: string,
  password: string,
  email: string | null,
  token: string | null
}
