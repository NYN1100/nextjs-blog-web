import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import Layout from "@/layout/layout";
import { BlogService } from "@/pages/api/blog.service";
import { GetServerSideProps } from "next";
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Sidebar } from "@/components";
import Image from "next/image";
import format from "date-fns/format";
import { calcEstimatedTimeToRead } from "@/helpers/time.format";
import { CategoryType } from "@/interfaces/categories.interfaces";

const DetailedBlogsPage = ({
  blog,
  latestBlogs,
  categories,
}: DetailedBlogsPageProps) => {
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
        <Box width={{ xs: "100%", md: "70%" }}>
          <Box
            sx={{
              backgroundColor: "black",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 8px 16px rgba(255,255,255,1)",
              marginBottom: "10px",
            }}
            position={"relative"}
            width={"100%"}
            height={{ xs: "30vh", md: "50vh" }}
          >
            <Image
              alt={blog.title}
              src={blog.image.url}
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            ></Image>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Avatar src={blog.author.avatar.url}></Avatar>
              <Box>
                <Typography>{blog.author.name}</Typography>
                <Box color={"gray"}>
                  {format(new Date(blog.createdAt), "dd MMM,yyyy")} &#x2022;{" "}
                  {calcEstimatedTimeToRead(blog.description.text)}min read
                </Box>
              </Box>
            </Box>
            <Typography variant="h3">{blog.title}</Typography>
            <Typography color={"gray"}>{blog.excerpt}</Typography>
            <div
              style={{ opacity: ".7" }}
              dangerouslySetInnerHTML={{ __html: blog.description.html }}
            ></div>
          </Box>
        </Box>
        <Sidebar latestBlogs={latestBlogs} categories={categories}></Sidebar>
      </Box>
    </Layout>
  );
};

export default DetailedBlogsPage;

export const getServerSideProps: GetServerSideProps<
  DetailedBlogsPageProps
> = async ({ query }) => {
  const blog = await BlogService.getDetailedBlogs(query.slug as string);
  const latestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();

  return {
    props: {
      blog,
      latestBlogs,
      categories,
    },
  };
};

export interface DetailedBlogsPageProps {
  blog: BlogsTypes;
  latestBlogs: BlogsTypes[];
  categories: CategoryType[];
}
