import React, { useState } from 'react';
import { Tag } from './Category';

/** draws tag manager
 * @param {Object} param0 
 * @param {Tag[]} param0.tags 
 * @param {Function} param0.updateTag updates the list of tags
 * @param {Function} param0.createTag inset a new tag into tags
 * @param {Function} param0.deleteTag delete a tag from tags
 * @returns {React.JSX.Element}
 */
export function TagManager({ tags, updateTag, createTag, deleteTag})
{
  const [editingTag, setEditingTag] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSeaching] = useState(false);

  /** display a tag editor
   * @param {Tag} e tag
   * @returns {React.JSX.Element}
   */
  function drawEditingTagItem(e)
  {
    const updateEditingTag = (e)=>
    {
      setEditingTag({...editingTag, [e.target.name]: e.target.value});
    }

    const save = ()=>
    {
      if (e.name == "")
      {
        alert('Name of a tag shall not be empty');
        return;
      }
      if (e.id == -1)
      {
        createTag(e);
      }
      else
      {
        updateTag(e);
      }
      setEditingTag(null);
    }

    return (
      <div className="category-list-item" key={e.id}>
        <div>
          <input
            type="text"
            name="name"
            value={e.name}
            onChange={(e)=>updateEditingTag(e)}
          />
          <input
            type="color"
            name="colour"
            value={e.colour}
            onChange={(e)=>updateEditingTag(e)}
          />
        </div>
        <div></div>
        <div><button onClick={()=>setEditingTag(null)}>Cancel</button></div>
        <div><button onClick={save}>Save</button></div>
      </div>
    )
  }

  /** display a tag
   * @param {Tag} e tag
   * @returns {React.JSX.Element}
   */
  function drawTagListItem(e)
  {
    return (
      <div className="category-list-item" key={e.id}>
        <div>
          <div className="tag-colour-block" style={{backgroundColor: e.colour}}></div>
          {"#" + e.name}</div>
        <div></div>
        <div><button onClick={()=>setEditingTag(e)}>Edit</button></div>
        <div><button onClick={()=>deleteTag(e)}>Delete</button></div>
      </div>
    )
  }

  /** list all tags
   * @returns {React.JSX.Element[]}
  */
  function ListAllTag()
  {
    let jsx = [];
    if (editingTag)
    {
      if (editingTag.id === -1)
      {
        jsx.push(drawEditingTagItem(editingTag));
      }
    }
    for (let i = 0; i < tags.length; i++)
    {
      if (isSearching)
      {
        if (tags[i].name.search(searchValue) == -1)
        {
          continue;
        }
      }
      if (editingTag)
      {
        if (editingTag.id === i)
        {
          jsx.push(drawEditingTagItem(editingTag));
          continue;
        }
      }
      jsx.push(drawTagListItem(tags[i]));
    }
    return jsx;
  }

  /** 
   * @returns {React.JSX.Element}
   */
  function drawNewTagButton()
  {
    if (editingTag)
    {
      if (editingTag.id == -1)
      {
        return;
      }
      else
      {
        return (
          <button disabled>+ New Tag</button>
        )
      }
    }
    return (
      <button onClick={()=>{setEditingTag(new Tag())}}>+ New Tag</button>
    )
  }

  /** draw search box
   * @returns {React.JSX.Element}
  */
  function drawSearchBox()
  {
    function OnSearchBoxChange(e)
    {
      if (e.target.value == "" && isSearching)
      {
        setIsSeaching(false);
      }
      setSearchValue(e.target.value);
    }

    function OnSearchClick()
    {
      setEditingTag(null);
      setIsSeaching(true);
    }

    return (
      <div className="search-box">
        <input
          type="text"
          name="searchValue"
          placeholder="Search a tag..."
          value={searchValue}
          onChange={(e)=>OnSearchBoxChange(e)}>
        </input>
        <button
         onClick={()=>OnSearchClick()}
        >Search</button>
      </div>
    )
  }

  return (
    <div>
      <div className="header-container">
        <h2>Tags</h2>
        <div></div>
        <div>{drawSearchBox()}</div>
        <div></div>
      </div>
      {drawNewTagButton()}
      <div>
        {ListAllTag()}
      </div>
    </div>
  );
}
