import { Content } from "@/components";
import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import Layout from "@/layout/layout";
import { BlogService } from "@/pages/api/blog.service";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";

const Index = ({ blogs }: BlogsPageProps) => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: { xs: "column", md: "row" },
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Content blogs={blogs}></Content>
      </Box>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<
  BlogsPageProps
> = async () => {
  const blogs = await BlogService.getAllBlogs();

  return {
    props: {
      blogs,
    },
  };
};

export interface BlogsPageProps {
  blogs: BlogsTypes[];
}
