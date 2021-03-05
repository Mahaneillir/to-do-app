import React from "react";

import Form from "./components/Form";
import Section from "./components/Section";
import "semantic-ui-css/semantic.min.css";

const appTitle = "To-Do App";

const App = () => {
    return (
        <div className="ui container">
            <Section>
                <h1>{appTitle}</h1>
            </Section>
            <Section>
                <Form />
            </Section>
        </div>
    );
};

export default App;
