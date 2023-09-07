import "react-multi-carousel/lib/styles.css";
import { Box, Avatar, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { format } from "date-fns";
// import { data } from "../data/data";
import { HeroProps } from "./hero.interface";
import { calcEstimatedTimeToRead } from "@/helpers/time.format";
const Hero = ({ blogs }: HeroProps) => {
  return (
    <Box sx={{ width: "100%", height: "70vh" }}>
      <Carousel
        responsive={{
          mobile: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
          },
        }}
      >
        {blogs.map((item) => (
          <Box key={item.id}>
            <Box sx={{ position: "relative", width: "100%", height: "70vh" }}>
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                style={{ objectFit: "cover", opacity: 0.6 }}
              ></Image>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <Box
                  width={{ xs: "100%", sm: "70%" }}
                  position={"relative"}
                  color="white"
                  sx={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    paddingLeft: { xs: "10px", sm: "50px" },
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "30px", md: "40px" } }}>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", md: "25px" },
                    }}
                  >
                    {item.excerpt}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Avatar
                      alt={item.author.name}
                      src={item.author.avatar.url}
                    ></Avatar>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography>{item.author.name}</Typography>
                      <Box>
                        {format(new Date(), "dd MMM, yyyy")}{" "}
                        {calcEstimatedTimeToRead(item.description.text)} min
                        read
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
export default Hero;
