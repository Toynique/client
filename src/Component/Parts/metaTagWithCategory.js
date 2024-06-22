// MetaTags.js

import React, { useEffect } from 'react';

const MetaTagWithCategory = ({ categorySlug, metaKeywords, metaDescription }) => {
  useEffect(() => { 
    const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    const metaDescriptionTag = document.querySelector('meta[name="description"]'); 
    if (metaKeywordsTag && metaDescriptionTag  ) {
        const category = (categorySlug).toLowerCase().replace('-', ' '); 
      const keywords = metaKeywords[category] || 'toynique';
      const description = metaDescription[category] || 'toynique';
      metaKeywordsTag.setAttribute('content', keywords);
      metaDescriptionTag.setAttribute('content', description);
    }
  }, [categorySlug, metaKeywords, metaDescription]);

  return null;  
};

export default MetaTagWithCategory;
