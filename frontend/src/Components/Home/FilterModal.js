import React,{ useEffect, useState } from 'react';
import PropTypes from "prop-types";//for type-checking the props
import '../../CSS/FilterModal.css';
import 'react-input-range/lib/css/index.css';//importing css file for input range styling
import InputRange from 'react-input-range';

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
    const [priceRange, setPriceRange] = useState({
        min:selectedFilters.priceRange?.min || 500, 
        max:selectedFilters.priceRange?.max || 20000,
    });

    const [propertyType, setPropertyType] = useState(
        selectedFilters.propertyType || "" //default is empty or selected from the props
    );

    const [roomType, setRoomType] = useState(selectedFilters.roomType || "");

    const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

    //useEffect hook to update when selscted filter props change

    useEffect(() => {
        setPriceRange({
            min: selectedFilters.priceRange?.min || 500,
            max: selectedFilters.priceRange?.max || 20000,
        });
        setPropertyType(selectedFilters.propertyType || "");
        setRoomType(selectedFilters.roomType || "");
        setAmenities(selectedFilters.amenities || []);
    }, [selectedFilters]);

    //function to handle the changes in price
    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    ///function to handle minimum value
    const handleMinimumInputChange = (e) => {
        const minValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({...prev, min:minValue}));
    };

    //function to handle max value
    const handleMaximumInputChange = (e) => {
        const maxValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({...prev, max:maxValue}));
    };
    
    //function to handle applying filters
    const handleFilterChange = () => {
        onFilterChange("minPrice", priceRange.min);
        onFilterChange("maxPrice", priceRange.max);
        onFilterChange("propertyType", propertyType);
        onFilterChange("propertyType", propertyType);
        onFilterChange("amenities", amenities);
        onClose();//closes the modal
    };

    //options for property type

    const propertyTypeOptions = [
        {
            value: 'House', 
            label: 'House', 
            icon: 'home',
        },
        {
            value: 'Flat', 
            label: 'Flat', 
            icon: 'apartment',
        },
        {
            value: 'Guest House',
            label: 'Guest House', 
            icon: 'hotel',
        },
        {
            value: 'Hotel', 
            label: 'Hotel', 
            icon: 'meeting_room',
        },
    ];

    //options for room type
        const roomTypeOptions = [{
            value: 'Entire Room',
            label: 'Entire Room',
            icon: 'hotel',
        },
        {
            value: 'Room',
            label: 'Room',
            icon: 'hotel',
        },
        {
            value: 'Anytype',
            label: 'Anytype',
            icon: 'apartment',
        },
    ];

    //options for Amenities
        const amenitiesOptions = [{
            value: 'Wifi', 
            label: 'Wifi', 
            icon: 'wifi',
        },
        {
            value: 'Kitchen', 
            label: 'Kitchen', 
            icon: 'kitchen',
        },
        {
            value: 'Ac', 
            label: 'AC', 
            icon: 'ac_unit',
        },
        {
            value: 'Washing Machine', 
            label: 'Washing Machine', 
            icon: 'local_laundry_service',
        },
        {
            value: 'Tv', 
            label: 'Tv', 
            icon: 'tv',
        },
        {
            value: 'Pool', 
            label: 'Pool', 
            icon: 'pool',
        },
        {
            value: 'Free Parking', 
            label: 'Free Parking', 
            icon: 'local_parking',
        },
    ];

    //function to clear filters
    const handleClearFilters = () => {
        setPriceRange({min: 500, max: 20000});//reset the price range
        setPropertyType("");
        setRoomType("");
        setAmenities([]);
    };

    //function to handle changes in amenities
    const handleAmenitiesChange = (selectedAmenity) => {
        setAmenities((prevAmenities) => prevAmenities.includes(selectedAmenity)? prevAmenities.filter((item)=> item!== selectedAmenity): [...prevAmenities, selectedAmenity]
        );
    };

    //function to handle change in the property type 
    const handlePropertyTypeChange = (selectedType) => {
        setPropertyType((prevType) => 
        prevType === selectedType ? "" : selectedType
        );
    };

    //function to handle room type 
    const handleRoomTypeChange = (selectedType) => {
        setRoomType((prevType) => 
        (prevType === selectedType ? "" : selectedType
        ));
    };

  return (
    <div className='modal-backdrop'>
    <div className='modal-content'>
        <h4>
            Filters <hr />
        </h4>
        {/* close button */}
        <button className='close-button' onClick={onClose}>
            <span>&times;</span>
        </button>

        {/* Filter sections */}
        <div className='modal-filters-container'>
            <div className='filter-section'>
                <label>Price range:</label>
                <InputRange
                minValue={500}
                maxValue={20000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                />
                <div className='range-inputs'>
                    <input 
                    type="number"
                    value={priceRange.min}
                    onChange={handleMinimumInputChange}
                    />
                    <span>-</span>
                    <input
                    type='number'
                    value={priceRange.max}
                    onChange={handleMaximumInputChange}
                    />
                </div>
            </div>
            {/* property type filter */}
            <div className='filter-section'>
                <label>Property Type: </label>
                <div className='icon-box'>
                    {propertyTypeOptions.map((options) => (
                        <div key={options.value}
                        className={`selectable-box ${propertyType === options.value ? "selected" : ""
                        }`}
                        onClick={() => handlePropertyTypeChange(options.value)}
                        >
                            <span className='material-icons'>{options.icon}</span>
                            <span>{options.label}</span>
                            </div>
                    ))}
                </div>
            </div>

            {/* Room type filter */}
            <div className='filter-section'>
                <label>Room Type:</label>
                <div className='icon-box'>
                    {roomTypeOptions.map((options) => (
                        <div key={options.value}
                        className={`selectable-box ${roomType === options.value ? "selected" : ""
                        }`}
                        onClick={() => handleRoomTypeChange(options.value)}
                        >
                            <span className='material-icons'>{options.icon}</span>
                            <span>{options.label}</span>
                            </div>
                    ))}
                </div>
            </div>

            {/* Amenities Filter */}
            <div className='filter-section'>
                <label>Amenities</label>
                <div className='amenities-checkboxes'>
                    {amenitiesOptions.map((options) => (
                        <div key={options.value}
                        className='amenity-checkbox'>
                            {console.log(amenities.includes(options.value))}

                            <input
                            type= 'checkbox'
                            value={options.value}
                            checked={amenities.includes(options.value)}
                            onChange={() => handleAmenitiesChange(options.value)}
                            />

                            <span className='material-icons amenitieslabel'>{options.icon}</span>
                            <span>{options.label}</span>
                            </div>
                    ))}
                </div>
            </div>

            {/* Filter action button */}
            <div className='filter-buttons'>
                <button className='clear-button' onClick={handleClearFilters}>Clear</button>
                <button onClick={handleFilterChange}>Apply Filters</button>
            </div>
        </div>
    </div>
    </div>
  );
};

FilterModal.propTypes = {
    selectedFilters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default FilterModal;