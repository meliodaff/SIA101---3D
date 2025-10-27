import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 bg-[#889D65] mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-white text-sm">
          <p>© {currentYear} Balay Ginhawa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;