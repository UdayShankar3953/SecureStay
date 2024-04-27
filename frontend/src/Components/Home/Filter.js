import React, {useEffect, useState} from 'react';
import FilterModal from './FilterModal';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Filter = () => {
    //state for controlling modal visibility 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //state for controlling selected filters
    const [selectedFilters, setSelectedFilters] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(propertyAction.updateSearchParams(selectedFilters));
        dispatch(getAllProperties());
    }, [selectedFilters, dispatch]); 

    //function to handle opening modal/popupwindow
    const handleOpenModal = () => {
        setIsModalOpen(true);//sets isModalOpen to true
    };

    //function to handle closing the Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);//sets isModalOpen to false
    };

    //function to handle changes in the filters
    const handleFilterChange = (filterName, value) => {
        //update the selcted filters with the new values
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,//it keeps the old existing values
            [filterName]: value,//new vlaues to the filter
        }));
    };





  return (
    <>
    {/* click event to open the modal */}
    <span className="material-symbols-outlined filter" onClick={handleOpenModal}>tune</span>
    {isModalOpen && (
        <FilterModal //we are passing the props to the Filter modal
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClose={handleCloseModal}
        />
    )}
    </>
  );
};

export default Filter