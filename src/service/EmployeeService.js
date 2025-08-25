import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employee";

class EmployeeService {
    getEmployees() {
        const token = localStorage.getItem("token"); // retrieve JWT from storage
        return axios.get(EMPLOYEE_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}` // send JWT token in header
            }
        });
    }

    getEmployeeById(id) {
        const token = localStorage.getItem("token");
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    createEmployee(employee) {
        const token = localStorage.getItem("token");
        return axios.post(EMPLOYEE_API_BASE_URL, employee, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    updateEmployee(id, employee) {
        const token = localStorage.getItem("token");
        return axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    deleteEmployee(id) {
        const token = localStorage.getItem("token");
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default new EmployeeService();
