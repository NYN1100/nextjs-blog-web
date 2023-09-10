import { Box } from "@mui/material";
import Layout from "@/layout/layout";
import { Hero } from "@/components";
import { Sidebar, Content } from "@/components";
import { BlogService } from "@/pages/api/blog.service";
import { GetServerSideProps } from "next";
import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import { CategoryType } from "@/interfaces/categories.interfaces";
import SEO from "@/layout/seo/seo";
const Index = ({ blogs, latestBlogs, categories }: HomePageProps) => {
  return (
    <SEO
      metaTitle="Yusuf Blogs"
      metaDescription="All blogs about IT"
      author="Aziz Azizov"
      metaKeywords="blogs,aziz"
    >
      <Layout>
        <Hero blogs={blogs.slice(0, 3)}></Hero>
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
    </SEO>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const blogs = await BlogService.getAllBlogs();
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

interface HomePageProps {
  blogs: BlogsTypes[];
  latestBlogs: BlogsTypes[];
  categories: CategoryType[];
}
