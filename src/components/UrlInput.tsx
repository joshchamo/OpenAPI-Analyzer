"use client";

import React, { useState } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";
import styles from "./UrlInput.module.css";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const suggestions = [
    { name: "GitHub REST API", url: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.1/ghes-3.1.json" },
    { name: "Petstore", url: "https://petstore.swagger.io/v2/swagger.json" }
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="url"
            placeholder="Paste OpenAPI / Swagger Spec URL (JSON or YAML)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? (
              <Loader2 className={styles.animateSpin} size={20} />
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className={styles.suggestions}>
        <span>Try these:</span>
        {suggestions.map((s) => (
          <button 
            key={s.name} 
            onClick={() => { setUrl(s.url); onAnalyze(s.url); }}
            className={styles.suggestionBtn}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};
