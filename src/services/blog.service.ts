import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import { CategoryType } from "@/interfaces/categories.interfaces";
import { graphql } from "graphql";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogService = {
  async getAllBlogs() {
    const query = gql`
      query GetBlogs {
        blogs {
          excerpt
          id
          slug
          title
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
          description {
            text
          }
          createdAt
        }
      }
    `;
    const result = await request<{ blogs: BlogsTypes[] }>(graphqlAPI, query);
    return result.blogs;
  },
  async getLatestBlog() {
    const query = gql`
      query GetLatestBlog {
        blogs(last: 2) {
          excerpt
          id
          slug
          title
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          description {
            text
          }
          createdAt
        }
      }
    `;
    const result = await request<{ blogs: BlogsTypes[] }>(graphqlAPI, query);
    return result.blogs;
  },
  async getCategories() {
    const query = gql`
      query GetCategory {
        categories {
          label
          slug
        }
      }
    `;

    const result = await request<{ categories: CategoryType[] }>(
      graphqlAPI,
      query
    );
    return result.categories;
  },
  async getDetailedBlogs(slug: string) {
    const query = gql`
      query GetDetailedBlog($slug: String!) {
        blog(where: { slug: $slug }) {
          excerpt
          id
          slug
          title
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
          description {
            text
            html
          }
          createdAt
        }
      }
    `;
    const result = await request<{ blog: BlogsTypes }>(graphqlAPI, query, {
      slug,
    });
    return result.blog;
  },
  async getDetailedCategoriesBlog(slug: string) {
    const query = gql`
      query getCategoriesBlog($slug: String!) {
        blogs(where: { category: { slug: $slug } }) {
          excerpt
          id
          slug
          title
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
          description {
            text
          }
          createdAt
        }
      }
    `;
    const result = await request<{ blogs: BlogsTypes[] }>(graphqlAPI, query, {
      slug,
    });
    return result.blogs;
  },
};
