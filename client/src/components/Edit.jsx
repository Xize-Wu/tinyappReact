import React from 'react';

export default function Edit(props) {
    return (
        <div className='edit-container'>
            <form>
                <label>
                    Long Url:
                    <input/>
                </label>
                <label>
                    Short Url:
                    <input/>
                </label>
            
            </form>
            <div className="buttons">
                <button onClick={() => { }}>Update</button >
                <button onClick={() => props.setEdit(false)}>Cancel</button>
            </div>

        </div>
    )
}