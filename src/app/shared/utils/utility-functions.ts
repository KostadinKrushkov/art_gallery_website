
export class DateUtilities {
  public static getYearFromDate(date: string) {
    return date.split(' ').slice(3, 4)[0];
  }
}

export class BrowserUtilities {
  public static reloadCurrentPage() {
    window.location.reload();
  }
}
