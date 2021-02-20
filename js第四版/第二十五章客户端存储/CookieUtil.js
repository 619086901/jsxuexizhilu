class CookieUtil {
  static get(name) {
    //用于找到给定名称的cookie值
    let cookieName = `${encodeURIComponent(name)}=`,
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {
      //判断是否存在名称后面有等号
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      //有则找到位置后面的分号
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      //然后进行编码返回
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
      return cookieValue;
    }
  }

  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`; //分号+空格分隔
    }

    if (path) {
      cookieText += `; path=${path}`; //URL路径
    }
    if (domain) {
      cookieText += `; domain=${domain}`; //可选的域
    }
    if (secure) {
      cookieText += `; secure`; //可选的安全标志
    }
    document.cookie = cookieText;
  }

  static unset(name, path, domain, secure) {
    CookieUtil.set(name, '', new Date(0), path, domain, secure); //删除cookie,过期时间设为过去
  }
}
