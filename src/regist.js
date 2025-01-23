import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const RegForm = ({ onSubmit, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  // List of countries with flags
  const countries = [
    { value: "+62", label: <><img src="https://flagcdn.com/w40/id.png" alt="ID" style={{ width: "20px", marginRight: "8px" }} />+62</> },
    { value: "+1", label: <><img src="https://flagcdn.com/w40/us.png" alt="US" style={{ width: "20px", marginRight: "8px" }} />+1</> },
    { value: "+44", label: <><img src="https://flagcdn.com/w40/gb.png" alt="GB" style={{ width: "20px", marginRight: "8px" }} />+44</> },
    { value: "+91", label: <><img src="https://flagcdn.com/w40/in.png" alt="IN" style={{ width: "20px", marginRight: "8px" }} />+91</> },
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== ConfirmPass) {
      alert("Passwords do not match");
      return;
    }

    // Call onSubmit from parent component
    const success = await onSubmit(email, password, phone, FirstName, LastName, countryCode, ConfirmPass, navigate);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>

            {/* First Name */}
            <div className="mb-3 form-floating">
              <input
                type="text"
                id="FirstName"
                className="form-control"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="FirstName">First Name</label>
            </div>

            {/* Last Name */}
            <div className="mb-3 form-floating">
              <input
                type="text"
                id="LastName"
                className="form-control"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="LastName">Last Name</label>
            </div>

            {/* Email */}
            <div className="mb-3 form-floating">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            {/* Country & Phone */}
            <div className="mb-3 d-flex">
              <div style={{ width: '40%' }}>
                <Select
                  options={countries}
                  onChange={(selectedOption) => setCountryCode(selectedOption.value)}
                  placeholder="Select Country"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#F1EFF1',
                      fontSize: '13px',
                      padding: '2px',
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                  required
                />
              </div>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ marginLeft: '10px' }}
                required
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="mb-3 form-floating">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="mb-3 form-floating">
              <input
                type="password"
                id="ConfirmPass"
                className="form-control"
                placeholder="Confirm Password"
                value={ConfirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <label htmlFor="ConfirmPass">Confirm Password</label>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="alert" style={{ color: 'red', marginTop: '-30px', marginBottom: '-10px', textAlign: 'center' }}>
                {errorMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 mt-1">
              Register
            </button>
          </form>

             <div
                      className="d-flex justify-content-center mt-4"
                      style={{ gap: "10px" }}
                    >
                      <button
                        className="btn btn-outline-danger rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px", fontSize: "18px" }}
                      >
                        <FaGoogle />
                      </button>
                      <button
                        className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px", fontSize: "18px" }}
                      >
                        <FaFacebook />
                      </button>
                      <button
                        className="btn btn-outline-dark rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px", fontSize: "18px" }}
                      >
                        <FaGithub />
                      </button>
                    </div>

          {/* Links */}
          <div className="text-center mt-3">
            <a href="/login" className="text-muted" style={{ textDecoration: 'none', fontSize: '12px', color: 'purple' }}>
              Already have an account? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
