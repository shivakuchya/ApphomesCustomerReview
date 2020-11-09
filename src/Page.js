import React, { useState } from 'react';
import jsonData from "./CompData.json";
import CustReview from './CustReview';
import "./App.css"

function Page() {
    const [data, setData] = useState(jsonData);
    const [listData, setListData] = useState(jsonData);
    const [inputDate, setInputDate] = useState("");

    const formatYYYYMMDD = function (date) {
        return date.getFullYear() + '-'
            + (date.getMonth() + 1) +
            "-" + date.getDate();
    }

    const handleInputDateChange = (e) => {
        const newDate = e.target.value;
        setInputDate(newDate);
        var formattedInputDate = formatYYYYMMDD(new Date(newDate));

        var filteredData = data.filter(item => {
            let reviewDate = formatYYYYMMDD(new Date(item.reviewDate));
            return reviewDate === formattedInputDate;
        });

        setListData(filteredData)
    };


    function handleStar(event) {
        var fivestar = data.filter(item => {
            return item.rating === event.target.value;
        });

        setListData(fivestar)
    }

    function handleVersion(event) {
        let versionType = data.filter(item => {
            return item.version === event.target.value;
        });

        setListData(versionType);
    }


    const getVersionOptions = () => {
        let lookup = {};
        let items = data;
        let result = []

        for (let index = 0; index < items.length; index++) {
            let version = items[index].version;
            if (!(version in lookup)) {
                lookup[version] = 1;
                result.push(version);
            }
        }

        return result;
    }

    function handleCountry(event) {
        let countrytype = data.filter(item => {
            return item.countryName === event.target.value;
        });

        setListData(countrytype)
    }

    const getCountryOptions = () => {
        let lookup = {};
        let items = data;
        let result = []

        for (let index = 0; index < items.length; index++) {
            let country = items[index].countryName;
            if (!(country in lookup)) {
                lookup[country] = 1;
                result.push(country);
            }
        }

        return result;
    }

    const getAllAppIds = () => {
        let lookup = {};
        let items = data;
        let result = []

        for (let index = 0; index < items.length; index++) {
            let appId = items[index].appID;
            if (!(appId in lookup)) {
                lookup[appId] = 1;
                result.push(appId);
            }
        }

        return result;
    }

    const sortData = (event) => {
        listData.sort((a, b) => {
            var dir = event.target.value;
            var aDate = new Date(a.reviewDate);
            var bDate = new Date(b.reviewDate);

            if (dir === 'new')
                return aDate <= bDate ? 1 : -1;

            if (dir === 'old')
                return aDate >= bDate ? 1 : -1;

            return 0;
        });
        setListData(listData)
        
    }

    const searchBarFilter = (event) => {
        let searchBar = data.filter(item => {
            return item.appStoreName === event.target.value;
        });
        setListData(searchBar)
    }


    return (<>
        <div className="container" >
            <div className="headercontainer row p-3 " style={{ borderBottom: "2px solid gray", boxShadow: "0 0 5px gray" }}>
                <div className="col-6">
                    <div className="form-group">
                        <label>Select Product</label>
                        <select className="form-control" searchable="Search here..">
                            <option value="" disabled selected>Choose your product</option>
                            {
                                getAllAppIds().map(item => <option value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Sorting</label>
                                <select className="form-control" onClick={(e) => sortData}>
                                    <option value="" disabled selected>Sort</option>
                                    <option value="new">Newest first</option>
                                    <option value="old">Oldest first</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Trsanslation</label>
                                <select className="form-control">
                                    <option value="1">English</option>
                                    <option value="2">German</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainContainer row" style={{ borderBottom: "2px solid gray", boxShadow: "0 0 5px gray" }}>
                <div className="filterContainer col-3 ">
                    <div >
                        <div className="row my-3 ">
                            <div className="searchbar col-12">
                                <input type="text" placeholder="Search.." onChange={(e) => searchBarFilter(e)}></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <input type="date" value={inputDate} onChange={(e) => handleInputDateChange(e)}></input>
                            </div>
                        </div>
                        {/* star filter */}
                        <div className="row my-3">
                            <div className="col-12">
                                <label>Filter by Rating</label>
                                <select className="form-control" onChange={handleStar}>
                                    <option value="" disabled selected>Ratings</option>
                                    <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                                    <option value="4">&#11088;&#11088;&#11088;&#11088;</option>
                                    <option value="3">&#11088;&#11088;&#11088;</option>
                                    <option value="2">&#11088;&#11088;</option>
                                    <option value="1">&#11088;</option>
                                </select>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Filter by version</label>
                                    <select className="form-control" onChange={handleVersion}>
                                        {
                                            getVersionOptions().map(item => <option value={item}>{item}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-12">
                                <label>Filter by Country</label>
                                <select className="form-control" onChange={handleCountry}>
                                    {
                                        getCountryOptions().map(item => <option value={item}>{item}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Date calender filter */}


                </div>
                <div className="custReviewContainer col-8">
                    <CustReview data={listData ? listData : data} />
                </div>

            </div>
        </div>
    </>);
}

export default Page;