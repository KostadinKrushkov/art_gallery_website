
export class DateUtilities {
  public static getYearFromDate(date: string) {
    return date.split(',')[0].split('/')[2]
  }

}
