import React, { useState } from 'react';

export default function PublicUrl (props) {

    return (<><div className="individual-url">
    <div className="long">
    {props.longUrl}
    </div>
    <div className="short">
    {props.shortUrl}
    </div>
    </div>
    </>
    )
}