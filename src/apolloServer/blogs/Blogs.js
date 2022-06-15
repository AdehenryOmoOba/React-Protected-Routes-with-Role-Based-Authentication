import React from "react";
import useAllBlogs from "../dataRequestHooks/GetAllBlogs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./blogs.css";

const SPINNER_STYLE = {
  textAlign: "center",
  fontSize: "3.2rem",
  width: "100vw",
  marginTop: "5rem",
};

function Blogs() {
  const { loading, error, data } = useAllBlogs();

  return (
    <div id="blogs">
      <h2 style={{ textAlign: "center" }}>🌸Blogs🌸</h2>
      {loading && (
        <FontAwesomeIcon
          style={SPINNER_STYLE}
          icon={faSpinner}
          className="spinner"
        />
      )}
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
