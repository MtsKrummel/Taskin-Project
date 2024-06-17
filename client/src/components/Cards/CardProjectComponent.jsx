import React from 'react';

const ProjectCard = ({ title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
      <h2 className="text-xl font-semibold mb-2 text-gray-600">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ProjectCard