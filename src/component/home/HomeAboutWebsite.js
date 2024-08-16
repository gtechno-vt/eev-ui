import React, { useEffect, useState } from 'react';

function HomeAboutWebsite() {

    const [aboutUsText, setAboutUsText] = useState(localStorage.getItem("aboutUsText"));

    useEffect(() => {
      // getData();
      setTimeout(() => {
        setAboutUsText(localStorage.getItem("aboutUsText"))
      }, 1000);
      setTimeout(() => {
          if(!aboutUsText){
            setAboutUsText(localStorage.getItem("aboutUsText"))
          }
      }, 2000);
      setTimeout(() => {
          if(!aboutUsText){
            setAboutUsText(localStorage.getItem("aboutUsText"))
          }
      }, 3000);
    }, []);


  return (
    <section className="step_home about_home">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h3>Information about Emirates E Visa Online</h3>
                    </div>
                </div>
            </div>

            <div className="all_step">

                {/* <div className="rect">
                    <div className="padd">
                        <div className="d-flex">
                            <span> 1 </span>
                            <p>Choose citizenship country and living country</p>
                        </div>
                    </div>
                </div>

                <div className="rect">
                    <div className="padd">
                        <div className="d-flex">
                            <span> 2 </span>
                            <p>Fill the online application form</p>
                        </div>
                    </div>
                </div>

                <div className="rect">
                    <div className="padd">
                        <div className="d-flex">
                            <span> 3 </span>
                            <p>Upload documents and Pay visa fees</p>
                        </div>
                    </div>
                </div>

                <div className="rect">
                    <div className="padd">
                        <div className="d-flex">
                            <span> 4 </span>
                            <p>Once the visa is approved then Get the visa by email</p>
                        </div>
                    </div>
                </div> */}


          
            <div  className="home-about-web-box pd_4" dangerouslySetInnerHTML={{ __html: aboutUsText }}>
                                {/* <h3>Title</h3> */}

                                {/* <ul>

                                    
                                        
                                                <li>
                                                    List Item Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nobis velit dicta sunt, soluta expedita error iusto est quae culpa ullam adipisci recusandae, consequatur suscipit quia quidem, totam ab facere doloribus repellat dolore. Optio amet tempore fugiat fugit qui placeat quasi! Suscipit iusto alias, dolor quisquam distinctio ipsam eum, pariatur possimus culpa perferendis necessitatibus ipsum nulla dolorum a, excepturi voluptate aliquid quo ipsa fuga ex tenetur! Illum deserunt enim dolores provident velit deleniti, a consequatur, molestiae suscipit fugiat cum repudiandae porro eius obcaecati dolorem fugit harum sunt id. Laudantium, architecto neque. Totam distinctio maxime error qui maiores autem reiciendis consequuntur.
                                                 </li>   
                                     
                                    
                                 
                                   
                                </ul> */}
                            </div>
                            </div>

            {/* <div className="step_img">
                <img src="img/OBJECTS.avif"  alt='object' loading="lazy"/>
            </div> */}

        </div>
    </section>
  );
}

export default HomeAboutWebsite;