export class ServerConfigConstants {
  public static readonly BACKEND_ADDRESS: string = 'https://localhost:5000';
}

export class FormActionsConstants {
  public static readonly CREATE = "CREATE";
  public static readonly UPDATE = "UPDATE";
}

export class AuthenticationResponseConstants {
  public static readonly SUCCESSFULLY_LOGGED_IN = 'Successfully logged in.';
  public static readonly SUCCESSFULLY_LOGGED_IN_AS_ADMIN = "Successfully logged in as admin.";
  public static readonly NEED_TO_LOGIN_AS_ADMIN_BEFORE_CUD_OPS = 'You need to log in as admin to create edit or delete any resources.';
}

export class AuthenticationRoleConstants {
  public static readonly USER_ROLE = 'USER_ROLE';
  public static readonly ADMIN_ROLE = 'ADMIN_ROLE';
}
