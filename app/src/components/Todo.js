import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const Todo = ({ item, removeTodo, view }) => {
    const [itemState] = useState(item);

    const getColor = (status) => {
        switch (status) {
            case "Inserito":
                return "red ";
            case "In Elaborazione":
                return "blue ";
            case "Completato":
                return "green ";
            default:
                return;
        }
    };

    return (
        <div className={getColor(itemState.status) + "card"}>
            <div className="content">
                <div className="header">{itemState.title}</div>
                <div className="meta">{itemState.status}</div>
                <div className="description">
                    <p style={{ overflow: "hidden" }}>{itemState.description}</p>
                </div>
                <div className="meta" style={{ marginTop: "10px" }}>
                    <DatePicker
                        locale="it"
                        dateFormat="dd/MM/yyyy"
                        selected={moment(item.exp).toDate()}
                    />
                </div>
                <div className="ui divider"></div>
                <div className="extra-content">
                    <div className="ui two buttons">
                        <button className="ui basic green button" onClick={view}>View</button>
                        <button className="ui basic red button" onClick={removeTodo}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
