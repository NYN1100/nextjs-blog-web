import { navItems } from "@/config/constants";
import { Box, Button, Typography, Divider, Avatar } from "@mui/material";
import Image from "next/image";
import { data } from "../data/data";
import { Fragment } from "react";
import format from "date-fns/format";
import { SidebarProps } from "./sidebar.interface";
import { calcEstimatedTimeToRead } from "@/helpers/time.format";
import { useRouter } from "next/router";

const Sidebar = ({ latestBlogs, categories }: SidebarProps): JSX.Element => {
  const router = useRouter();
  return (
    <Box width={{ xs: "100%", md: "30%" }}>
      <Box style={{ position: "sticky", top: "100px" }}>
        <Box
          sx={{
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Category</Typography>
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
        <Box
          sx={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Latest blog</Typography>
          <Box sx={{ marginTop: "20px" }}>
            {latestBlogs.map((item) => (
              <Fragment key={item.title}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Box>
                    <Image
                      alt={item.title}
                      src={item.image.url}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    ></Image>
                  </Box>
                  <Box>
                    <Typography
                      style={{ marginBottom: "20px" }}
                      variant="body1"
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar src={item.author.avatar.url}></Avatar>
                      <Box>
                        <Typography variant="body2">
                          {item.author.name}
                        </Typography>
                        <Box sx={{ opacity: 0.6 }}>
                          {format(new Date(item.createdAt), "dd MMM,yyyy")}{" "}
                          &#x2022;{" "}
                          {calcEstimatedTimeToRead(item.description.text)}min
                          read
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ bgcolor: "gray" }} />
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
