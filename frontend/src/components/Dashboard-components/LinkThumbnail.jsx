import React, { useState, useEffect } from 'react';

const LinkThumbnail = ({ url }) => {
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

    const ogAppID = import.meta.env.VITE_OG_APP_ID

  useEffect(() => {
    // Fetch Open Graph data from the URL
    fetch(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${ogAppID}`)
      .then(response => response.json())
      .then(data => {
        if (data.hybridGraph) {
          setThumbnail(data.hybridGraph.image);
          setTitle(data.hybridGraph.title);
          setDescription(data.hybridGraph.description);
        }
      })
      .catch(error => console.error('Error fetching Open Graph data:', error));
  }, [url]);

  return (
    <div className='shadow-md rounded-md bg-white2 overflow-hidden mt-2'>
      <a href={url} target="_blank" className='flex'>
      <div className='max-w-40 overflow-hidden'>
        {thumbnail && <img src={thumbnail} alt={title} className='w-full'/>}
      </div>
      <div className='p-4'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p>{description}</p>
      </div>
      </a>
    </div>
  );
};

export default LinkThumbnail;

