import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ value, handleSearchValue }) => {
    return (
        <div>
            <input
                className="w-100"
                type="text"
                value={value}
                onChange={handleSearchValue}
            />
        </div>
    );
};

SearchUser.propTypes = {
    value: PropTypes.string.isRequired,
    handleSearchValue: PropTypes.func.isRequired
};

export default SearchUser;
