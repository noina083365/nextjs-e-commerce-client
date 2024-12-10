export const extractCookie = (cookies: string | undefined) => {
  const parsedCookies = cookies
    ? cookies
      .split('; ')
      .reduce((acc: { [key: string]: string }, current) => {
        const [key, value] = current.split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};

  const token = parsedCookies['token'];
  return token;
}