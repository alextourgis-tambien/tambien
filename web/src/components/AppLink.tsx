"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { HoverLabel } from "./HoverLabel";
import { NavigationLoader } from "./Loader";
export default function AppLink({
  children,
  ...props
}: ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props}>
      {typeof children === "string" && !props.hrefLang ? (
        <HoverLabel>{children}</HoverLabel>
      ) : (
        children
      )}
      <NavigationLoader />
    </NextLink>
  );
}
