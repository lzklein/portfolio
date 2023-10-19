// In your Resume component
import React, { useEffect } from 'react';

const Resume = () => {
  useEffect(() => {
    // Open the PDF in a new tab when the component mounts
    window.open(`${process.env.PUBLIC_URL}/Resume 2023.pdf`, '_blank');
  }, []);

  return (
    <div>
      {/* Your Resume content */}
    </div>
  );
}

export default Resume;
