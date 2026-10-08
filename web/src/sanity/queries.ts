import type {} from "../../sanity.types";
import { defineQuery } from "next-sanity";
export const SITE_QUERY = defineQuery(`{
 "settings": *[_type == "settings"][0]{...,"clients": clients[]{...,"icon":icon.asset->url}},
 "projects": *[_type == "project" && defined(slug.current)] | order(order asc){...,"related": related[]._ref,"services": services[]->name},
 "pages": *[_type == "page" && defined(slug.current)],
 "feed": *[_type == "feedItem"] | order(order asc){...,project->{slug,cover,title,description}},
 "process": *[_type == "processStep"] | order(order asc),
 "testimonials": *[_type == "testimonial"] | order(order asc),
 "offers": *[_type == "offer"] | order(order asc),
 "services": *[_type == "service"] | order(order asc)
}`);
