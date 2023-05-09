import { environment } from "src/environments/environment";

export class ServerConfigConstants {
  public static BACKEND_ADDRESS: string = environment.BACKEND_ADDRESS;
  public static readonly NUM_PICTURES_TO_EXTEND_LOAD = 9
}

export class KeyConstants {
  public static siteKey: string = '6Lfu-WYkAAAAAGzn54L1sUWnYN3Vbb2dkn99h-dF';
}

export class FormActionsConstants {
  public static readonly CREATE = "Create";
  public static readonly UPDATE = "Update";
}

export class AuthenticationResponseConstants {
  public static readonly SUCCESSFULLY_LOGGED_IN = 'Successfully logged in.';
  public static readonly SUCCESSFULLY_LOGGED_IN_AS_ADMIN = "Successfully logged in as admin.";
  public static readonly NEED_TO_LOGIN_AS_ADMIN_BEFORE_CUD_OPS = 'You need to log in as admin to create edit or delete any resources.';
}

export class AuthenticationRoleConstants {
  public static readonly USER_ROLE = 'USER_ROLE';
  public static readonly ADMIN_ROLE = 'ADMIN_ROLE';
  public static readonly ALL_ROLES: string[] = [this.USER_ROLE, this.ADMIN_ROLE];
}
