import type { UserBase } from "~/lib/api/types/user";

declare module '#auth-utils' {
  interface User extends UserBase { }

  interface UserSession {

  }

  interface SecureSessionData {

  }
}

export { };
