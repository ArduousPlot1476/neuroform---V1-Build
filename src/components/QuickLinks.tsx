import React from 'react';
import './QuickLinks.css'; // Import the CSS for styling

// Define a type for the link objects
interface QuickLink {
  name: string;
  url: string;
  imgSrc: string;
}

const QuickLinks: React.FC = () => {
  // Array of link objects with names, URLs, and image paths
  const links: QuickLink[] = [
    { name: 'Google', url: 'https://www.google.com', imgSrc: '/assets/Google_G_logo.svg.png' },
    { name: 'YouTube', url: 'https://www.youtube.com', imgSrc: '/assets/YouTube-Symbol.png' },
    { name: 'Reddit', url: 'https://www.reddit.com', imgSrc: '/assets/Reddit_Logo.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', imgSrc: '/assets/Linkedin-Logo-2011.png' },
  ];

  return (
    <div className="quick-link-menu">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link"
          title={link.name} // Tooltip with the link name
        >
          <img src={link.imgSrc} alt={link.name} className="quick-link-img" />
        </a>
      ))}
    </div>
  );
};

export default QuickLinks;
