"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { NavigationLoader } from "./Loader";
export default function AppLink({
  children,
  ...props
}: ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props}>
      {children}
      <NavigationLoader />
    </NextLink>
  );
}
