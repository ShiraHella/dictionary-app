import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary(props) {
    const [keyword, setKeyword] = useState(props.defaultKeyword);
    const [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);

    function handleResponse(response) {
        setResults(response.data[0]);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }
    function load() {
        setLoaded(true);
        search();
    }


    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }
    if (loaded) {
        return (
            <div className="Dictionary">
                <section>
                    <h4>What word would you like to look up?</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="search" onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
                    </form>
                    <div className="hint">suggested words: defenestrate, juxtaposition, incredulous ...</div>
                </section>
                <Results results={results} />
            </div>);
    } else {
        load();
        return "Loading";
    }
}