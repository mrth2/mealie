import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'

export default class AuthService {
  userManager: UserManager

  constructor() {
    const appOrigin = useNuxtApp().$config.app.baseURL;
    const { $config } = useNuxtApp();
    this.userManager = new UserManager({
      authority: $config.apiUrl,
      client_id: 'mealie-oidc',
      client_secret: 'mealie-oidc-secret',
      redirect_uri: `${appOrigin}/login`,
      silent_redirect_uri: `${appOrigin}/silent-refresh`,
      post_logout_redirect_uri: appOrigin,
      response_type: 'code',
      userStore: new WebStorageStateStore(),
      loadUserInfo: true,
    })
  }

  public signInRedirect() {
    return this.userManager.signinRedirect()
  }

  public signInCallback() {
    return this.userManager.signinCallback()
  }

  public renewToken(): Promise<void> {
    return this.userManager.signinSilentCallback()
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect()
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser()
  }
}
