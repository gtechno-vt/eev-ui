import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    // Make a request to your server with the formData
    fetch('https://ymfzdgfyzhm.emiratesevisaonline.com/document/258/OTHER/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
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

        <div className='container d-flex flex-column align-items-center'>
          <img src="/img/404_page-not-found.webp" alt='notfound' loading="lazy"/>
          <div className='d-flex w100 justify-content-center'>
          <button  className="black-btn" onClick={() => navigate(`/`)}>Home</button>
          <button  className="green-btn ml-2" onClick={() => navigate(`/apply-now`)}>Apply for Visa</button>

          </div>
        </div>
      </div>


    </>
  )
};

export default NoPage;