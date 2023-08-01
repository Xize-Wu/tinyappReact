import React from 'react';

export default function Edit(props) {
    const [form, setForm] = useState({
        longUrl:props.longUrl,
        shortUrl:props.shortUrl
    })

    const handleChange = (event) =>{
        setForm({
            ...form,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className='edit-container'>
            <form>
                <label>
                    <div>Long Url</div>
                    <input required defaultValue={props.longUrl}/>
                </label>
                <label>
                    <div>Short Url</div>
                    <input required defaultValue={props.shortUrl}/>
                </label>
            
            </form>
            <div className="buttons">
                <button onClick={() => { }}>Update</button >
                <button onClick={() => props.setEdit(false)}>Cancel</button>
            </div>

        </div>
    )
}