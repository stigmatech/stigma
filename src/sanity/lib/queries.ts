import { defineQuery } from "next-sanity";

export const getAllPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->title
  }
`);

export const getPostBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    body,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "author": author->{ name, image },
    "categories": categories[]->title
  }
`);

export const getAllCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] {
    _id,
    title,
    slug,
    category,
    industry,
    description,
    "heroImage": heroImage.asset->url
  }
`);

export const getCaseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    industry,
    description,
    "heroImage": heroImage.asset->url,
    stats,
    challenge,
    solution,
    impact,
    testimonial
  }
`);
