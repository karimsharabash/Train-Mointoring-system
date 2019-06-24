import React from 'react';
import Navbar from '../navbar/navbar';
import CarouselPage from '../slide-show/slideShow'
import Footer from '../footer/footer';

import trainHealth from './assets/trainhealth.jpg';
import felxiableSol from './assets/flexiablesol.jpg';
import realTime from './assets/realtime.png';
import accessImg from './assets/access.png';
import cctv from './assets/cctv.png';
import trainMap from './assets/trainmap.png';
import Background from './assets/train11.jpg';

var pargraphStyle = { textAlign: 'justify', fontSize: '16px', lineHeight: '26px', textIndent: '30px', margin: '0' }
var containersStyle = { marginTop: "10px" }
var sectiononeStyle = {
    backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', width: "100%", height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center',
};
var imgStyle = { width: '70px', height: '70px' }
var benefitsStyle = { padding: "15px", marginTop: "15px", backgroundColor: 'hsla(0, 0%, 76%, 0.68)' }
var solutionStyle = { padding: "15px", marginTop: "15px", textAlign: 'center', backgroundColor: '#f6f8f7' }

const Home = () => {
    return (
        <div >
            <Navbar />
            <div className="container-fluid" style={sectiononeStyle} >
                <div className="row">
                    <div className="col-sm" ></div>
                    <div className="col-sm" style={{ backgroundColor: "#eeeeec" }}>
                        <p style={pargraphStyle}><b>Train Monitoring System (TMS) is a flexible, real time solution for rail ways monitoring. With a modular design that integrates seamlessly with any new or existing train equipment, our TMS provides a centralized system for operators and maintainers to keep track on each train's status.</b></p>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="container-fluid" style={containersStyle} >
                <h4 style={{ textAlign: 'center', marginBottom: "10px" }}>World of Challenges </h4>
                <div className="row">
                    <div className="col-sm" >
                        <CarouselPage />
                    </div>
                    <div className="col-sm" style={{ textAlign: 'center' }}>
                        <br />
                        <p style={pargraphStyle}>
                            One of the most main challenges that faces rail ways operators is the Infrastructure Aging which require regular checkup on old equipment (un wanted down time).
                            on the countrary if that regular check was neglected that may cause accidents and the growing demand for safer passenger rail transit away of accidents.
                            <b>So Today Main Challenges </b> are Component failures and drivers , operators neglectance both may cause Catastrophic accidents.

                             <b> A centralized, onboard system that monitors, controls, and diagnoses
                             vehicle-system problems is vital </b>for addressing the
                           challenges of rail manufacturers and transit authorities.
                            </p>
                        <br />
                        <p style={pargraphStyle}>The system continuously identifies all required data and presents it clearly to employees at headquarters: the current operational status, vehicle locations, driver status, disruptions and irregularities or potential conflicts. An integrated fault management system ensures that with the help of comprehensive dispatching functions, the planned train operations can take place or be restored.</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-fluid" style={benefitsStyle} >

                <h4 style={{ textAlign: 'center' }}>Benefits </h4>
                <h5 style={{ textAlign: 'center' }}><b>Plan, Control and Monitor Railways</b></h5>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="csc-default">
                            <ul className="ul-check" style={{ listStyleType: "none" }}>
                                <li><i className="fas fa-check text-info mx-2"></i>Low-cost solution for reliable rail operations</li>
                                <li><i className="fas fa-check text-info mx-2"></i>Monitoring operations</li>
                                <li><i className="fas fa-check text-info mx-2"></i>Efficient action in case of disruptions</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="csc-default">
                            <ul className="ul-check" style={{ listStyleType: "none" }}>
                                <li><i className="fas fa-check text-info mx-2"></i>Integration of video management</li>
                                <li><i className="fas fa-check text-info mx-2"></i>Integration of the infrastructure at the stations</li>
                                <li><i className="fas fa-check text-info mx-2"></i>Integrated quality management system (Business Intelligence)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-fluid" style={solutionStyle}>
                <h4>Our Solution</h4>
                <div className='row'>
                    <div className="col-sm">
                        <img src={trainHealth} style={imgStyle} />
                        <p>Monitoring Trains' motor status and speed </p>
                    </div>
                    <div className="col-sm">
                        <img src={felxiableSol} style={imgStyle} />
                        <p>
                            The solution is applicable for old and new trains</p>
                    </div>
                    <div className="col-sm">
                        <img src={realTime} style={imgStyle} />
                        <p>Easy access to real-time and archived information </p>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm">
                        <img src={cctv} style={imgStyle} />
                        <p>Monitoring Driver Capin and send alert if something happen</p>
                    </div>
                    <div className="col-sm">
                        <img src={trainMap} style={imgStyle} />
                        <p> Real time spectating the route per trip for each train</p>
                    </div>
                    <div className="col-sm">
                        <img src={accessImg} style={imgStyle} />
                        <p>
                            Color-coded screens to allow you to see the status of each train any time</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home;