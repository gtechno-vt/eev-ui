import React, { useEffect } from 'react';

const NoPage = () => {
 
  useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

  return (
    <>
        
        
<div className='error_404'>

  <div className='container'>
    <img src="img/404_page-not-found.webp" />
  </div>
</div>

      
    </>
  )
};

export default NoPage;