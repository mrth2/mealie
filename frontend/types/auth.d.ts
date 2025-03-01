import type { UserOut } from "~/lib/api/types/user";

declare module '#auth-utils' {
  interface User extends UserOut { }

  interface UserSession {

  }

  interface SecureSessionData {

  }
}

export { };
