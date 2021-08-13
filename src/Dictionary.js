import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
    const [keyword, setKeyword] = useState(props.defaultKeyword);
    const [results, setResults] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [photos, setPhotos] = useState(null);

    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
    }

    function handlePexelsResponse(response) {
        setPhotos(response.data.photos);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
        axios.get(apiUrl).then(handleDictionaryResponse);

        let pexelsApiKey = `563492ad6f917000010000017038007a24ca44aaa2563d488ff8ad67`;
        let pexelsAprilUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
        let headers = { Authorization: `Bearer ${pexelsApiKey}` }
        axios.get(pexelsAprilUrl, { headers: headers }).then(handlePexelsResponse);
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
                <Photos photos={photos} />
            </div>);
    } else {
        load();
        return "Loading";
    }
}