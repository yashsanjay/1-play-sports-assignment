import React from "react";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>

      {/* Skeleton cards */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-text"></div>
          <div className="skeleton-actions"></div>
        </div>
      ))}
    </div>
  );
}