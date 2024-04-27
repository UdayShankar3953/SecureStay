import React,{useState} from 'react';
import { DatePicker, Space } from 'antd';

import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Search = () => {
    //  from check-in to check-out we are desructuring the range picker component from the datepicker which extracts multiple properties from an object here datepicker is an object, which extracts properties from rangepicker
    const { RangePicker } = DatePicker;
    const [keyword, setKeyword] = useState({});
    // for storing the value
    const[value, setValue] = useState([]);

    const dispatch = useDispatch();
    function searchHandler(e) {
        e.preventDefault();
        dispatch(propertyAction.updateSearchParams(keyword));
        dispatch(getAllProperties());
        setKeyword({
            city: "",
            guests: "",
            dareIn: "",
            dateOut: "",
        });
        setValue([]);
    }

    function returnDates(date,dateString){
        //setting date range value in state
        setValue([date[0], date[1]]);
        //updating keyword object with date range 
        updateKeyword("dateIn", dateString[0]);
        updateKeyword("dateOut", dateString[1]);
    }

    //function to update specific field in th ekeyword state object
    const updateKeyword = (field, value) => {
        setKeyword((prevKeyword) => ({
            ...prevKeyword,
            [field]:value,
        }));
    }; 


  return (
    <>
    <div className="searchbar">
        {/* input field for searching destinations */}
        <input
        className="search"
        id="search_destination"
        placeholder="Search destinations"
        type="text"
        value={keyword.city}
        onChange={(e) => updateKeyword("city", e.target.value)}
        />
        {/* Date range Picker */}

        <Space direction='vertical' size={12} className='search'>
            <RangePicker 
            value={value}
            format='YYYY-MM-DD'
            picker='date'
            className='date_picker'
            disabledDate={(current) => {
                return current && current.isBefore(Date.now(), "day");
            }}
            onChange={returnDates}
            />
        </Space>
        {/* input field for adding guests */}

        <input 
        className='search'
        id='addguest'
        placeholder='Add guest'
        type='number'
        //value={keyword.guests}
        onChange={(e) => updateKeyword("guests", e.target.value)} 
        />

        {/* Search Icon */}
    <span className="material-symbols-outlined searchicon" onClick={searchHandler}>search</span>
    </div>    
    </>
  );
};

export default Search;