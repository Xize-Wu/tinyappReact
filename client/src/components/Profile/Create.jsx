import React, { useState } from 'react';
import axios from 'axios'

export default function Create(props) {

    const [form, setForm] = useState({
        longUrl: "",
        shortUrl: ""
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        })
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        try{
            const res = await axios.post('/urls', {form}, {withCredentials:true})
            console.log(res)
            props.load()
            setForm({
                longUrl: "",
                shortUrl: ""
            })
        }
        catch(err){
            console.error('Haiyaa...', err)
        }
    }


    return (
        <form className='edit-container' onSubmit={handleCreate}>
            <label>
                <div>Long Url</div>
                <input
                    id='longUrl'
                    type='text'
                    required
                    value={form.longUrl}
                    onChange={handleChange}
                />
            </label>
            <label>
                <div>Short Url</div>
                <input
                    id='shortUrl'
                    type='text'
                    required
                    value={form.shortUrl}
                    onChange={handleChange}
                />
            </label>
            <div className="buttons">
                <button type="submit">Confirm</button >
                <button onClick={() => props.setCreate()}>Cancel</button>

            </div>
        </form>
    )
}