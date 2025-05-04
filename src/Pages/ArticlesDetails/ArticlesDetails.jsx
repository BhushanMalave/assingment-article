import React from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ArticlesDetails.css";

const ArticleDetails = () => {
    const { state } = useLocation();
  const { articleId } = useParams();
  const navigate = useNavigate();

  const article = state?.articleData;

  if (!article) {
    return <p>No article data found for ID: {articleId}</p>;
  }

  const handleTagClick = (tag) => {
    navigate("/", { state: { tag } });
  };

  const renderTags = () =>
    article.tags.map((tag, idx) => (
      <span
        key={idx}
        onClick={() => handleTagClick(tag)}
        style={{ marginRight: "8px", cursor: "pointer", color: "blue" }}
      >
        #{tag}
      </span>
    ));

  const renderAuthorInfo = () => (
    <div className="author_bio">
      <h4>Author Info</h4>
      <img
        src="data:image/jpeg;base64,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"
        alt={article.author?.authorName}
        width={50}
        className="author_image"
      />
      <div className="author_name">
        <strong>Author Name: </strong>
        {article?.author?.authorName}
      </div>{" "}
      <div className="author_name">
        <strong>Author Id: </strong>
        {article?.author?.authorId}
      </div>
    </div>
  );

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      <img src={article?.hero} alt={article.title} />
      <p>{article.Subtitle}</p>
      <p>
        <strong>Description:</strong> {article?.description}
      </p>
      <div className="tags">
        <strong>Tags: </strong>
        {renderTags()}
      </div>
      {renderAuthorInfo()}
    </div>
  );
};

export default ArticleDetails;