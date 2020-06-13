import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err.message, err.response))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err.message, err.response))
  };

  const handleChanges = e => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
    console.log('new color: ', newColor)
  }

  const handleNewColorSubmit = e => {
    // e.preventDefault()
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => console.log("res: ", res))
      .catch(err => console.log("err: ", err.message, err.response)) 
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleNewColorSubmit}>
        <input
          type='text'
          name='color'
          value={newColor.color}
          placeholder='Color'
          onChange={handleChanges}
        />
        <input
          type='text'
          name='code'
          value={newColor.hex}
          placeholder='Hex Code'
          onChange={handleChanges}
        />
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
