import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'

const NavBar = ({ viewMode, setViewMode }) => {

  const handleChange = () => {
    setViewMode(!viewMode);
    toggleBodyClasses(viewMode);
  }

  const toggleBodyClasses = isDarkMode => {
    if (isDarkMode) {
      const test = document.querySelectorAll('*');
      test.forEach(el => {
        el.classList.add('bg-dark', 'text-light', 'border-light')

      });
      // document.body.classList.add('bg-dark', 'text-light');
      // document.body.classList.remove('bg-light', 'text-dark');
    } else {
      const test = document.querySelectorAll('*');
      test.forEach(el => {
      el.classList.remove('bg-dark', 'text-light', 'border-light')
      });
      // document.body.classList.add('bg-light', 'text-dark');
      // document.body.classList.remove('bg-dark', 'text-light');
    }
  }

  return (
    <div className="form-check form-switch mx-5">
      <input onChange={ handleChange }
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
      />
      { viewMode
       ?
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckDefault"><span> ☀️</span>
        </label>
       :
        <label
          className="form-check-label"
          htmlfor="flexSwitchCheckDefault"><span> 🌙 </span>
        </label>
       }
    </div>
  )
}

export default NavBar;