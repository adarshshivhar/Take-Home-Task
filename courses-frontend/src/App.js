import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ title: '', price: '' });
  const [change, setChange] = useState(false);
  const [idglobal, setIdGlobal] = useState(0);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourse({ ...course, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
    setChange(false);
    if (change == false) {
      if (course.title && course.price) {
        axios.post(`http://127.0.0.1:8081/api/courses`, course).then((res) => {
          setCourses([...courses, res.data]);
          setCourse({ title: '', price: '' });
        });
      }
    } else {
      if (course.title && course.price) {
        axios.put(`http://127.0.0.1:8081/api/courses/${idglobal}`, course);
        window.location.reload(false);
      }
    }
  };

  const fetchCourses = async () => {
    const newCourses = await axios('http://127.0.0.1:8081/api/courses');
    setCourses(newCourses.data);
  };

  const deleteCourse = (id) => {
    axios.delete(`http://127.0.0.1:8081/api/courses/${id}`);
    window.location.reload(false);
  };

  const editCourse = (id, course) => {
    setChange(true);
    setCourse({ title: course.title, price: course.price });
    setIdGlobal(id);
    //await axios.put(`http://127.0.0.1:8081/api/courses/${id}`, course);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className='w3-container'>
        <div className='w3-display-middle width-middle'>
          <form className='w3-container w3-card-4 w3-light-grey'>
            <h2>Enter Details</h2>
            <p>
              <label>Course Name</label>
              <input
                className='w3-input w3-border'
                type='text'
                id='title'
                name='title'
                value={course.title}
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Price</label>
              <input
                className='w3-input w3-border'
                type='number'
                id='price'
                name='price'
                value={course.price}
                onChange={handleChange}
              />
            </p>
            <p className='w3-center'>
              <button
                className='w3-button w3-blue'
                type='submit'
                onClick={handleSubmit}
              >
                {change ? 'Edit' : 'Add'}
              </button>
            </p>
          </form>
          <hr />
          <ul className='w3-ul w3-card-4 list-width'>
            {courses.map((course) => {
              const { id, title, price } = course;
              return (
                <li key={id}>
                  <div className='w3-container'>
                    <span className='w3-left'>{title}</span>
                    <span className='w3-right hand'>
                      <i
                        className='far fa-edit'
                        onClick={() => editCourse(id, course)}
                      ></i>
                    </span>
                    <br />
                    <span className='w3-left'>${price}</span>
                    <span className='w3-right hand'>
                      <i
                        className='far fa-trash-alt'
                        onClick={() => deleteCourse(id)}
                      ></i>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
