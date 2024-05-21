import React from 'react'

function Search(data) {
    return (
        console.log(data),
        <>
            <h1>Hi</h1>
            {
                data.length === 0 && ( // Check if search has been performed and no results found
                    <div className="search-results">
                        <h5>No post found</h5>
                    </div>
                )
            }
            {
                data.length > 0 && (
                    <div className="search-results">
                        <h5>Search Results:</h5>
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>{result.content}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default Search