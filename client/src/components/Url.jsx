import React from 'react';

export default function Url (props) {
    return (<div className="individual-url">
    <div className="long">
    {props.longUrl}
    </div>
    <div className="short">
    {props.shortUrl}
    </div>
    <div className="buttons">
        <button>Edit</button>
        <button>Delete</button>
    </div>
    </div>
    )
}