import { BlogsTypes } from "@/interfaces/blogs.interfaces";
import { CategoryType } from "@/interfaces/categories.interfaces";

export interface SidebarProps {
  latestBlogs: BlogsTypes[];
  categories: CategoryType[];
}
