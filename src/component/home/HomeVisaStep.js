import React from 'react';

function HomeVisaStep() {


  return (
    <section className="step_home">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Steps to apply for visa</h2>
                    </div>
                </div>
            </div>

            <div className="all_step">

                <div className="rect">
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
                </div>


            </div>

            <div className="step_img">
                <img src="img/OBJECTS.avif"  alt='object' loading="lazy"/>
            </div>

        </div>
    </section>
  );
}

export default HomeVisaStep;