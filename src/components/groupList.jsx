import React from "react";
import PropTypes from "prop-types";
import { convertToObject } from "../utils/convertToObject";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const itemsMap = convertToObject(items, "name");
    console.log(Object.keys(items));
    return (
        <ul className="list-group">
            {Object.keys(itemsMap).map((item) => (
                <li
                    key={itemsMap[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (itemsMap[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(itemsMap[item], itemsMap.profession)}
                    role="button"
                >
                    {itemsMap[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};
export default GroupList;
