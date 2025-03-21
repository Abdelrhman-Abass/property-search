import React from "react";
import { useLocale } from "next-intl";
import {Link} from "@/routing";
import Image from "next/image";

const BlogSidebar = () => {
  const local = useLocale();
  const tags = ["For Sale", "House", "Realton", "Apartments", "Villa"];
  const categories = ["Houses", "Apartments", "Office", "Villa", "Townhome"];

  return (
    <div className="blog-sidebar">
      <div className="sidebar-widget mb30">
        <div className="search_area">
          <input
            type="text"
            className="form-control"
            placeholder="What are you looking for?"
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      <div className="sidebar-widget mb30">
        <h6 className="widget-title">Categories</h6>
        <div className="category-list d-flex flex-column mt20">
          {categories.map((category, index) => (
            <Link href="#" key={index}>
              {category}
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar-widget mb30">
        <h6 className="widget-title">Latest Posts</h6>
        {[].map((post, index) => (
          <div
            className="list-news-style d-flex align-items-center mt20 mb20"
            key={index}
          >
            <div className="news-img flex-shrink-0">
              <Image width={90} height={80} src={post.image} alt="blog"  loading="lazy"/>
            </div>
            <div className="news-content flex-shrink-1 mx-3">
              <p className="new-text mb0 fz14">
                <Link href={`/blog/${post.id}`}>{post.content}</Link>
              </p>
              <Link className="body-light-color" href="#">
                {post.date.day} {post.date.month}, {post.date.year}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-widget mb30 pb20">
        <h6 className="widget-title">Popular Tags</h6>
        <div className="tag-list mt20">
          {tags.map((tag, index) => (
            <Link href="#" key={index}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
