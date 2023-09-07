import { CategoryType } from "@/interfaces/categories.interfaces";
import Layout from "@/layout/layout";
import { BlogService } from "@/services/blog.service";
import { Box, Button, Divider, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

const CategoryPage = ({ categories }: CategoryPageProps) => {
  const router = useRouter();
  return (
    <Layout>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            padding: "60px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Categories</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
          >
            {categories.map((nav) => (
              <Fragment key={nav.slug}>
                <Button
                  fullWidth
                  sx={{
                    color: "#cccccc",
                    justifyContent: "flex-start",
                    height: "50px",
                    fontSize: "1rem",
                  }}
                  onClick={() => router.push(`/category/${nav.slug}`)}
                >
                  {nav.label}
                </Button>
                <Divider sx={{ bgcolor: "gray" }} />
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<
  CategoryPageProps
> = async () => {
  const categories = await BlogService.getCategories();

  return {
    props: {
      categories,
    },
  };
};

export interface CategoryPageProps {
  categories: CategoryType[];
}
