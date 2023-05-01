export class AccessToken {
  constructor() {}

  aTGetter() {
    return this.accessToken;
  }
  aTSetter(aT) {
    this.accessToken = aT;
  }
  newATGetter() {
    return this.newAccessToken;
  }
  newATSetter(newAT) {
    this.newAccessToken = newAT;
  }
}
