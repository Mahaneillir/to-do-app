import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import Section from "./Section";
import List from "./List";
import todos from "../apis";
import moment from "moment";

registerLocale("it", it);

const Form = () => {
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState();
    const [inputTitle, setInputTitle] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [inputStatus, setInputStatus] = useState("");
    const [expDate, setExpDate] = useState(new Date());

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get("/todo/");
            setTodoList(data);
        }
        fetchData();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post("/todo/", item);
        setTodoList((oldList) => [...oldList, data]);
    };

    const putTodo = async (item) => {
        const { data } = await todos.put("/todo/" + id, item);
        setTodoList((todoList) =>
            todoList.filter((oldItem) => oldItem._id !== item._id)
        );
        setTodoList((todoList) => [...todoList, data]);
    };

    const removeTodo = async (id) => {
        await todos.delete("/todo/" + id);
        setTodoList((oldList) => oldList.filter((item) => item._id !== id));
    };

    const save = (e) => {
        e.preventDefault();
        if (!validate()) return;
        if (id !== null && id !== undefined) {
            putTodo({
                _id: id,
                title: inputTitle,
                description: inputDesc,
                status: inputStatus,
                exp: expDate,
            });
        } else {
            addTodo({
                title: inputTitle,
                description: inputDesc,
                status: inputStatus,
                exp: expDate,
            });
        }
        setId(null);
        setInputTitle("");
        setInputDesc("");
        setInputStatus("");
        setExpDate(new Date());
    };

    const validate = (e) => {
        if (
            inputTitle !== null &&
            inputTitle !== undefined &&
            inputTitle.trim() === ""
        )
            return false;
        if (
            inputDesc !== null &&
            inputDesc !== undefined &&
            inputDesc.trim() === ""
        )
            return false;
        if (
            inputStatus !== null &&
            inputStatus !== undefined &&
            inputStatus.trim() === ""
        )
            return false;
        return true;
    };

    const view = (e) => {
        setId(e._id);
        setInputTitle(e.title);
        setInputDesc(e.description);
        setInputStatus(e.status);
        setExpDate(moment(e.exp).toDate());
    };

    return (
        <div className="container fluid">
            <form className="ui form" onSubmit={save}>
                <div className="ui grid fields">
                    <div
                        className={
                            "sixteen wide field required" + (inputTitle ? "" : " error")
                        }
                    >
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="title..."
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                        />
                    </div>

                    <div
                        className={
                            "sixteen wide field required" + (inputDesc ? "" : " error")
                        }
                    >
                        <label>Description</label>
                        <textarea
                            rows="5"
                            type="text"
                            value={inputDesc}
                            placeholder="descriptions..."
                            onChange={(e) => setInputDesc(e.target.value)}
                        ></textarea>
                    </div>

                    <div
                        className={
                            "four wide field required" + (inputStatus ? "" : " error")
                        }
                    >
                        <label>Status</label>
                        <Dropdown
                            placeholder="Status"
                            fluid
                            selection
                            selected={inputStatus}
                            options={[
                                { key: "0", text: "Inserito", value: "Inserito" },
                                { key: "1", text: "In Elaborazione", value: "In Elaborazione" },
                                { key: "2", text: "Completato", value: "Completato" },
                            ]}
                            onChange={(e) => setInputStatus(e.target.textContent)}
                            value = {inputStatus}
                        />
                    </div>

                    <div className="four wide field">
                        <label>Expiration Date:</label>
                        <DatePicker
                            locale="it"
                            dateFormat="dd/MM/yyyy"
                            selected={expDate}
                            onChange={(date) => setExpDate(date)}
                        />
                    </div>

                    <div className="column eight wide center aligned">
                        <button type="submit" className="fluid ui primary button">
                            <h1>Save</h1>{" "}
                        </button>
                    </div>
                </div>
            </form>
            <Section>
                <List removeTodo={removeTodo} list={todoList} view={view} />
            </Section>
        </div>
    );
};

export default Form;
