import React, { useEffect, useState } from 'react';

const NoPage = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    // Make a request to your server with the formData
    fetch('https://dgf0agfzdhu.emiratesevisaonline.com/document/258/OTHER/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>

    {/* 
    <form onSubmit={handleSubmit}>
      <label>
        Choose a file:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
    */}

      <div className='error_404'>

        <div className='container'>
          <img src="/img/404_page-not-found.webp" />
        </div>
      </div>


    </>
  )
};

export default NoPage;