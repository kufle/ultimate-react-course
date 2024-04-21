import { useEffect, useRef } from "react"

function Search({searchQuery, setSearchQuery}) {
    const inputEl = useRef(null);

    useEffect(() => {
        function callback(e) {
            if(document.activeElement === inputEl.current) return;

            if(e.code === 'Enter') {
                inputEl.current.focus();
                setSearchQuery("");
            }
        }

        document.addEventListener("keydown", callback);

        return () => document.removeEventListener("keydown", callback);
    },[setSearchQuery]);
    
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search
