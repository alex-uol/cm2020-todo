import React, { useState } from 'react';
import { Category } from './Category';

/** draws category manager
 * @param {Object} param0 
 * @param {Category[]} param0.categories list of all categories
 * @param {Function} param0.updateCategory updates the list of categories
 * @param {Function} param0.createCategory create a categorie
 * @param {Function} param0.deleteCategory delete a categorie
 * @returns {React.JSX.Element}
 */
export function CategoryManager({ categories, updateCategory, createCategory, deleteCategory})
{
  const [editingCat, setEditingCat] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSeaching] = useState(false);

  /** display a category editor
   * @param {Category} e category
   * @returns {React.JSX.Element}
   */
  function drawEditingCategory(e)
  {
    const updateTitle = (title)=>
    {
      setEditingCat({...e, "title": title});
    }

    const save = ()=>
    {
      if (e.title == "")
      {
        alert('Title of a category shall not be empty');
        return;
      }
      if (e.id == -1)
      {
        createCategory(e);
      }
      else
      {
        updateCategory(e);
      }
      setEditingCat(null);
    }

    return (
      <div className="category-list-item" key={e.id}>
        <input
          type="text"
          name="title"
          value={e.title}
          onChange={(e)=>updateTitle(e.target.value)}></input>
        <div></div>
        <div><button onClick={()=>setEditingCat(null)}>Cancel</button></div>
        <div><button onClick={save}>Save</button></div>
      </div>
    )
  }

  /** display a category in ordinary list item
   * @param {Category} e category
   * @returns {React.JSX.Element}
   */
  function drawCategory(e)
  {
    return (
      <div className="category-list-item" key={e.id}>
        <div>{"#" + e.title}</div>
        <div></div>
        <div><button onClick={()=>setEditingCat(e)}>Edit</button></div>
        <div><button onClick={()=>deleteCategory(e)}>Delete</button></div>
      </div>
    )
  }

  /** list all categories in _categories
   * @returns {React.JSX.Element[]}
  */
  function ListAllCategory()
  {
    let jsx = [];
    if (editingCat)
    {
      if (editingCat.id === -1)
        {
            jsx.push(drawEditingCategory(editingCat));
        }
    }
    for (let i = 0; i < categories.length; i++)
    {
      if (isSearching)
      {
        if (categories[i].title.search(searchValue) == -1)
        {
          continue;
        }
      }
      if (editingCat)
      {
        if (editingCat.id === i)
        {
          jsx.push(drawEditingCategory(editingCat));
          continue;
        }
      }
      jsx.push(drawCategory(categories[i]));
    }
    return jsx;
  }

  /** draw create new category button
   * @returns {React.JSX.Element}
  */
  function drawNewCategoryButton()
  {
    if (editingCat)
    {
      if (editingCat.id == -1)
      {
        return;
      }
      else
      {
        return (
          <button disabled>+ New Category</button>
        )
      }
    }
    return (
      <button onClick={()=>{setEditingCat(new Category())}}>+ New Category</button>
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
      setEditingCat(null);
      setIsSeaching(true);
    }

    return (
      <div className="search-box">
        <input
          type="text"
          name="searchValue"
          placeholder="Search a category..."
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
    <div className="categorie-manager">
      <div className="header-container">
        <h2>Categories</h2>
        <div></div>
        {drawSearchBox()}
        <div></div>
      </div>
      {drawNewCategoryButton()}
      <div>
        {ListAllCategory()}
      </div>
    </div>
  );
}
