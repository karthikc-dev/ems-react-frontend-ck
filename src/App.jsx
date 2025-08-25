import { useEffect, useState } from 'react'
import './css/App.css';
import EmployeeService from "./service/EmployeeService.js";
import LoginForm from "./LoginForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      EmployeeService.getEmployees()
        .then(response => setEmployees(response.data))
        .catch(err => console.error("Failed to load employees:", err.message));
    }

  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }


  //delete employee
  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then(() => {
      setEmployees(employees.filter(emp => emp.id !== id));
    })
      .catch(error => {
        console.error("Delete failed:", error.response?.data || error.message);
      });
  };

  const updateEmployee = (user) => {
    setUserData(user);
    setIsModalOpen(true);
    setEditing(true);
  }

  //close model
  const closeModel = () => {
    setIsModalOpen(false)
  }

  //handle on change data
  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleAddRecord = () => {
    setIsModalOpen(true);
    setEditing(false);
    setUserData(initialFormState);
    setUserData({ firstName: "", lastName: "", email: "", password: "" });

  }

  //create and update an employee
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh (important for forms)


    if (userData.id) {
      // Update existing employee
      EmployeeService.updateEmployee(userData.id, userData)
        .then((response) => {
          setEmployees(prev =>
            prev.map(emp => emp.id === userData.id ? response.data : emp)
          );
          setIsModalOpen(false);
          setEditing(false);
          setUserData({ firstName: "", lastName: "", email: "", password: "" });
          alert("Employee updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating employee:", error.response?.data || error.message);
        });
    } else {
      EmployeeService.createEmployee(userData)
        .then((response) => {
          setEmployees(prev => [...prev, response.data]);
          setIsModalOpen(false);
          setUserData({ firstName: "", lastName: "", email: "", password: "" });
          alert("Employee created successfully!");
        })
        .catch((error) => {
          console.error("Error creating employee:", error.response?.data || error.message);
        });
    }
  };

  return (
    <>
      <div className='container'>
        <h3>Employee Management</h3>
        <div className='add-record'>
          <button className='btn green' onClick={handleAddRecord}>Add Record</button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              employees &&
              employees.map(emp => (

                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button className='btn green' onClick={() => updateEmployee(emp)}>Edit</button>
                  </td>
                  <td>
                    <button className='btn red' onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          //this is for add record pop up
          isModalOpen && (
            <div className='model'>
              <div className='model-content'>
                <span className='close' onClick={closeModel}>&times;</span>
                <h1>User Record</h1>
                <div className='input-group'>
                  <label htmlFor="name">First Name</label>
                  <input type='text' value={userData.firstName} name='firstName' id='firstName' onChange={handleData} />
                </div>
                <div className='input-group'>
                  <label htmlFor="age">Last Name</label>
                  <input type='text' value={userData.lastName} name='lastName' id='lastName' onChange={handleData} />
                </div>
                <div className='input-group'>
                  <label htmlFor="city">Email</label>
                  <input type='text' value={userData.email} name='email' id='email' onChange={handleData} />
                </div>
                <div className='input-group'>
                  <label htmlFor="city">Password</label>
                  <input type='text' value={userData.password} name='password' id='password' onChange={handleData} />
                </div>
                <button className='btn green' onClick={handleSubmit}>Add User</button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App