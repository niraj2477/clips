import { useCookies } from "react-cookie";

export const removeCookie = () => {
  const [removeCookie] = useCookies(["user"]);
  removeCookie("name");
  removeCookie("email");
  removeCookie("token");
  removeCookie("avatar");
  removeCookie("loggedIn");
};

export const setCookie = (user) => {
  const [setCookie] = useCookies(["user"]);
  setCookie("name", encodeURI(user.displayName), {
    maxAge: 3652,
  });
  setCookie("email", encodeURI(user.email), {
    maxAge: 3652,
  });
  setCookie("avatar", encodeURI(user.photoURL), {
    maxAge: 3652,
  });
  setCookie("token", encodeURI(user.accessToken), {
    maxAge: 3652,
  });
  setCookie("loggedIn", true, { maxAge: 3652 });
};


