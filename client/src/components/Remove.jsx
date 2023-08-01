import React, { useState } from 'react';
import axios from 'axios';

export default function Remove(props) {

    console.log(props.id)
    const handleRemove = async (event) =>{
        event.preventDefault()
        try{
            const res = await axios.post('http://localhost:8080/remove', { id: props.id }) 
            console.log(res)
            props.load()
        }
        catch(err){
            console.error('Haiyaa...', err)
        }
    }

    return (
        <form className='confirm_delete-container' onSubmit={handleRemove}>
            <p>Delete this short Url?</p>
            <div className="buttons">
                <button type="submit">Delete</button >
                <button onClick={() => props.setRemove(false)}>Cancel</button>
            </div>

        </form>
    )
}