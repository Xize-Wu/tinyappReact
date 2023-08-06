import React, { useState } from 'react';
import Edit from './Profile/Edit';
import Remove from './Profile/Remove';


export default function PublicUrl (props) {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false)

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