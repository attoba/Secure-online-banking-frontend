import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cin: '',
    gender: '',
    address: '',
    country: '',
    email: '',
    phoneNumber: '',
    password: '',
    Cpassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstName) {
      formErrors.firstName = 'First Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      formErrors.firstName = 'First Name must contain only letters';
    }

    if (!formData.lastName) {
      formErrors.lastName = 'Last Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      formErrors.lastName = 'Last Name must contain only letters';
    }

    if (!formData.cin) {
      formErrors.cin = 'CIN is required';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.cin)) {
      formErrors.cin = 'CIN must contain only letters and digits';
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }

    if (!formData.address) {
      formErrors.address = 'Address is required';
    } else if (!/^[A-Za-z0-9 ,:]+$/.test(formData.address)) {
      formErrors.address = 'Address must contain only letters, digits, spaces, commas, and colons';
    }

    if (!formData.phoneNumber) {
      formErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone Number must be 10 digits';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.Cpassword) {
      formErrors.Cpassword = 'Passwords do not match';
    }

    setError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error creating account');
      }

      setSuccess(true);
      navigate('/Authentification');
    } catch (error) {
      setError({ general: error.message });
    } finally {
      setSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        cin: '',
        gender: '',
        address: '',
        country: '',
        email: '',
        phoneNumber: '',
        password: '',
        Cpassword: '',
      });
    }
  };

  return (
    <div className='big-container'>
     <div className="create-account-container">
      <h2>Ouvrir un compte, vérification des coordonnées</h2>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="create-account-fields">
          <div className="create-account-group">
            <div className="create-account-field ">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="votre prenom"
                required
                onChange={handleChange}
              />
              {error.firstName && <p className="error-message">{error.firstName}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="votre nom"
                required
                onChange={handleChange}
              />
              {error.lastName && <p className="error-message">{error.lastName}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="cin">Cin:</label>
              <input
                type="text"
                id="cin"
                name="cin"
                required
                onChange={handleChange}
              />
              {error.cin && <p className="error-message">{error.cin}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
              />
              {error.email && <p className="error-message">{error.email}</p>}
            </div>
          </div>
          <div className="create-account-group">
            <div className="create-account-field ">
              <label htmlFor="address">Adresse:</label>
              <textarea
                id="address"
                name="address"
                rows="2"
                required
                onChange={handleChange}
              ></textarea>
              {error.address && <p className="error-message">{error.address}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="phoneNumber">Tel:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
                onChange={handleChange}
              />
              {error.phoneNumber && <p className="error-message">{error.phoneNumber}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="password">Mot de Pass:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Entrer un password"
                required
                onChange={handleChange}
              />
              {error.password && <p className="error-message">{error.password}</p>}
            </div>
            <div className="create-account-field ">
              <label htmlFor="Cpassword">Confirmer le Mot de Pass:</label>
              <input
                type="password"
                id="Cpassword"
                name="Cpassword"
                placeholder="confirmer le password"
                required
                onChange={handleChange}
              />
              {error.Cpassword && <p className="error-message">{error.Cpassword}</p>}
            </div>
          </div>
        </div>
        <div className="create-account-submit">
          <button type="submit" disabled={submitting}>
            {submitting ? 'En cours...' : 'Confirmer'}
          </button>
        </div>
        {success && <p className="success-message">Account created successfully!</p>}
        {error.general && <p className="error-message">{error.general}</p>}
      </form>
    </div>
    </div>
  );
}

export default CreateAccount;
