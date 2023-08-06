import React, { useState } from 'react';
import axios from 'axios'

export default function Edit(props) {
    const [form, setForm] = useState({
        id: props.id,
        longUrl: props.longUrl,
        shortUrl: props.shortUrl
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        })
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        try{
            const res = await axios.post('urls/edit', form)
            console.log(res)
            props.load()
            props.setEdit(false)
        }
        catch(err){
            console.error('Haiyaa...', err)
        }
    }
    return (
        <form className='edit-container' onSubmit={handleEdit}>
            <label>
                <div>Long Url</div>
                <input
                    id='longUrl'
                    type='text'
                    required
                    defaultValue={props.longUrl}
                    onChange={handleChange}
                />
            </label>
            <label>
                <div>Short Url</div>
                <input
                    id='shortUrl'
                    type='text'
                    required
                    defaultValue={props.shortUrl}
                    onChange={handleChange}
                />
            </label>
            <div className="buttons">
                <button type="submit">Update</button >
                <button onClick={() => props.setEdit(false)}>Cancel</button>
            </div>
        </form>

    )
}