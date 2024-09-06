import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const ErrorPage: React.FC = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className="home-link">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default ErrorPage;
