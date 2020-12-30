const cookieMessage = 'cookie-message';
const locale = 'locale';

const storage = {
  getCookieMessage() {
    return localStorage.getItem(cookieMessage);
  },
  setCookieMessage() {
    return localStorage.setItem(cookieMessage, 'true');
  },
  setLocale(code) {
    return localStorage.setItem(locale, code);
  },
  getLocale() {
    return localStorage.getItem(locale);
  },
};

export default ({ app, store }, inject) => {
  inject('storage', storage);
}
