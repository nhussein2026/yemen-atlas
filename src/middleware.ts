import type { MiddlewareHandler } from "astro";
import { isValidLang, DEFAULT_LANG } from "./lib/i18n";

export const onRequest: MiddlewareHandler = async (
  { url, redirect, locals },
  next
) => {
  const [, lang] = url.pathname.split("/");

  if (!isValidLang(lang)) {
    return redirect(`/${DEFAULT_LANG}${url.pathname}`);
  }

  locals.lang = lang;
  return next();
};
