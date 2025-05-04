import React, { useEffect, useState } from "react";
import PullToRefresh from "react-pull-to-refresh";
import { useLocation, useNavigate } from "react-router-dom";
import homePage from "../../services/homePage.json";
import articlejson from "../../services/article.json";
import "../Articles/Articles.css";


// Helper to get unique values
const uniqueValues = (data, key) => [...new Set(data.map((item) => item[key]))];

// FilterDropdown Component
const FilterDropdown = ({ name, value, options, onChange, placeholder }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="filter"
  >
    <option value="">{placeholder}</option>
    {options.map((option, idx) => (
      <option key={idx} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Articles = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const initialTag = location?.state?.tag || "";
    const [filters, setFilters] = useState({
      author: "",
      category: "",
      articleType: "",
      tag: initialTag,
    });
    const [refreshToggle, setRefreshToggle] = useState(false);

    const authors = uniqueValues(homePage?.data?.articles || [], "authorName");
    const categoriesList = uniqueValues(
      homePage?.data?.articles || [],
      "categoryName"
    );
    const articleTypes = uniqueValues(
      homePage?.data?.articles || [],
      "articleType"
    );
    const tags = [
      ...new Set(
        homePage?.data?.articles?.flatMap((article) => article.tags) || []
      ),
    ];

    const filteredArticles = homePage?.data?.articles?.filter((article) => {
      const tagMatch = !filters.tag || article.tags?.includes(filters.tag);
      return (
        (!filters.author || article.authorName === filters.author) &&
        (!filters.category || article.categoryName === filters.category) &&
        (!filters.articleType || article.articleType === filters.articleType) &&
        tagMatch
      );
    });
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleTagClick = (tag) => {
      setFilters((prev) => ({ ...prev, tag }));
    };
  
    const handleArticleClick = (articleId) => {
      const articleData = articlejson?.data?.find(
        (article) => article.articleId === articleId
      );
      navigate(`/articleDetails/${articleId}`, { state: { articleData } });
    };
  
    const handleRefresh = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          setRefreshToggle((prev) => !prev);
          resolve();
        }, 1000);
      });
    };
  
    useEffect(() => {
      if (initialTag) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    }, [initialTag, location.pathname, navigate]);

  
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="article-list">
          <h2 className="articles">Articles</h2>
  
          {/* Filters */}
          <div className="filters">
            <FilterDropdown
              name="author"
              value={filters.author}
              options={authors}
              onChange={handleFilterChange}
              placeholder="Author"
            />
            <FilterDropdown
              name="category"
              value={filters.category}
              options={categoriesList}
              onChange={handleFilterChange}
              placeholder="Category"
            />
            <FilterDropdown
              name="articleType"
              value={filters.articleType}
              options={articleTypes}
              onChange={handleFilterChange}
              placeholder="Article Type"
            />
            <FilterDropdown
              name="tag"
              value={filters.tag}
              options={tags}
              onChange={handleFilterChange}
              placeholder="Tag"
            />
            <button
              className="reset-btn"
              onClick={() =>
                setFilters({ author: "", category: "", articleType: "", tag: "" })
              }
            >
              Reset Filter
            </button>
          </div>
  
          {/* Articles */}
          <div className="article-container">
            {filteredArticles.map((article) => (
              <div key={article.articleId} className="article-item" onClick={() => handleArticleClick(article.articleId)}>
                <div
                  className="hero-image"
                >
                  <img src={article.hero} alt={article.title} />
                </div>
                <div className="article-details">
                  <div className="title">{article.title}</div>
                  <div className="subtitle">{article.subtitle}</div>
                  <div className="author">
                    {article.tags.map((tag, idx) => (
                      <span
                        className="tag"
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* No articles found */}
          {filteredArticles.length === 0 && (
            <p>No articles found matching the selected filters.</p>
          )}
        </div>
      </PullToRefresh>
    );
    
};

export default Articles;