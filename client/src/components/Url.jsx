import React, { useState } from 'react';
import Edit from './Edit';
import Remove from './Remove';


export default function Url (props) {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false)

    return (<><div className="individual-url">
    <div className="long">
    {props.longUrl}
    </div>
    <div className="short">
    {props.shortUrl}
    </div>
    <div className="buttons">
        <button onClick={()=>{setRemove(false);setEdit(true)}}>Edit</button >
        <button onClick={()=>{setRemove(true); setEdit(false)}}>Delete</button>
    </div>
    </div>
    {edit?<Edit longUrl={props.longUrl} shortUrl={props.shortUrl} setEdit={()=>setEdit()}/>:''}
    {remove?<Remove id={props.id} setRemove={()=>setRemove()} load={()=>props.load()}/>:''}
    </>
    )
}