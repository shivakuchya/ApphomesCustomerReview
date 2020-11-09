import React from 'react';
// import Filters from "./Filters"
import "./App.css";



function CustReview(props) {



    return (
        <>
            {
                props.data.map(item => <div key={item.id}>
                    <div className="card p-0 m-2" style={{boxShadow: "0 0 5px gray"}}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <button className="appstorename">{item.appStoreName}</button>
                             &emsp;{item.reviewHeading}  &emsp;<Stars number={item.rating} /> </h5>
                            <p className="card-text">  {item.reviewText}</p>
                            <footer className="footer">
                                <div className="footer-text">
                                    by {item.reviewUserName} &emsp;
                                {item.reviewDate}&emsp;
                                -{item.version}&emsp;
                                {item.countryName}&emsp;
                                        <div className="reply-share row">
                                        <a href="#" className="reply mr-5">reply</a>
                                        <div>
                                        <div className="form-group text-right">
                                                <select className="form-control">
                                                    <option value="1" disabled selected>Share</option>
                                                    <option value="2">Whatsapp</option>
                                                    <option value="3">Gmail</option>
                                                    <option value="4">Message</option>
                                                </select>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            </footer>
                        </div>
                    </div>
                </div>)

            }
        </>
    );
}

function Stars(props) {

    let getStars = (number) => {
        let output = '';
        for(let i = 1; i <= number; i++) {
            output += String.fromCharCode(11088);
        }
        return output;
    }

    return(
        <>
            {getStars(props.number)}
        </>
    );
}

export default CustReview