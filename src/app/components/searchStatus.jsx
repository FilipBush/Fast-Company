import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = () => {
        const lastIndex = Number(length.toString().slice(-1));
        const phrase =
            [2, 3, 4].includes(lastIndex) && ![12, 13, 14].includes(length)
                ? "человека"
                : "человек";
        return length + " " + phrase + " тусанет с тобой сегодня";
    };

    return (
        <h2>
            <span className={"badge bg-" + (length ? "primary" : "danger")}>
                {length ? renderPhrase() : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
