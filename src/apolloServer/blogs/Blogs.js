import React from "react";
import useAllBlogs from "../dataRequestHooks/GetAllBlogs";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import "./blogs.css";

function Blogs() {
  const { loading, error, data } = useAllBlogs();

  return (
    <div id="blogs">
      <h2 style={{ textAlign: "center" }}>🌸Blogs🌸</h2>
      {loading && <Spinner />}
      <ul>
        {data &&
          data.allBlogs.map((blog, index) => (
            <li key={index}>
              <Link to="/blog">{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Blogs;
