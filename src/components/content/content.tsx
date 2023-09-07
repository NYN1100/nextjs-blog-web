import { Box, Avatar, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import { ContentProps } from "./content.interface";
import { calcEstimatedTimeToRead } from "@/helpers/time.format";

import { useRouter } from "next/router";
const Content = ({ blogs }: ContentProps) => {
  const router = useRouter();
  return (
    <Box sx={{ width: { xs: "100%", md: "70%" } }}>
      {blogs.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: "rgba(0,0,0,.5)",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "0 3px 5px whitesmoke",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/blog/${item.slug}`)}
        >
          <Box position={"relative"} width={"100%"} height={"50vh"}>
            <Image
              alt={item.title}
              src={item.image.url}
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
            ></Image>
          </Box>
          <Box sx={{ padding: "20px 0" }}>
            <Typography variant="h5">{item.title}</Typography>
            <Typography sx={{ opacity: 0.6 }} variant="h6">
              {item.excerpt}
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: "gray" }} />
          <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <Avatar src={item.author.avatar.url}></Avatar>
            <Box>
              <Typography>{item.author.name}</Typography>
              <Box sx={{ opacity: 0.6 }}>
                {format(new Date(item.createdAt), "dd MMM, yyyy")}{" "}
                {calcEstimatedTimeToRead(item.description.text)}min read
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Content;
