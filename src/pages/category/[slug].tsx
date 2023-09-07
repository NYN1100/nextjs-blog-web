import React from "react";
import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import { BlogService } from "@/services/blog.service";
import { CategoryType } from "@/interfaces/categories.interfaces";
import { GetServerSideProps } from "next";
import Layout from "@/layout/layout";
import { Content, Hero, Sidebar } from "@/components";
import { Box } from "@mui/material";
const CategoryDetailedPage = ({
  blogs,
  latestBlogs,
  categories,
}: DetailedCategoryPageProps) => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: { xs: "column", md: "row" },
          padding: "20px",
        }}
      >
        <Sidebar latestBlogs={latestBlogs} categories={categories}></Sidebar>
        <Content blogs={blogs}></Content>
      </Box>
    </Layout>
  );
};

export default CategoryDetailedPage;

export const getServerSideProps: GetServerSideProps<
  DetailedCategoryPageProps
> = async ({ query }) => {
  const blogs = await BlogService.getDetailedCategoriesBlog(
    query.slug as string
  );
  const latestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();

  return {
    props: {
      blogs,
      latestBlogs,
      categories,
    },
  };
};

export interface DetailedCategoryPageProps {
  blogs: BlogsTypes[];
  latestBlogs: BlogsTypes[];
  categories: CategoryType[];
}
