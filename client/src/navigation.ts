import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "ru", "uz"] as const;
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/products": "/products",
  "/products/[id]": "/products/[id]",
  "/settings": "/settings",
  "/products-for-admin": "/products-for-admin",
  "/products-for-admin/[id]": "/products-for-admin/[id]",
  "/products-for-admin/new": "/products-for-admin/new",
  "/categories": "/categories",

  // If locales use different paths, you can
  // specify each external path per locale.
  "/contacts": "/contacts",
  "/cart": "/cart",
  "/orders": "/orders",

  // Dynamic params are supported via square brackets
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
