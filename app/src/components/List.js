import React from "react";
import Todo from "./Todo";

const List = ({ list, removeTodo, view }) => {
    const renderedList = list.map((item) => (
        <Todo
            key={item._id}
            item={item}
            removeTodo={(e) => removeTodo(item._id)}
            view={(e) => view(item)}
        />
    ));
    return <div className="ui cards center aligned">{renderedList}</div>;
};

export default List;
