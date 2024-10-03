// pages/index.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://backend-c597.vercel.app/users'; // Your API URL

const Home = () => {
    const [contacts, setContacts] = useState([]); // State for storing contacts
    const [name, setName] = useState(''); // State for name input
    const [address, setAddress] = useState(''); // State for address input
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
    const [email, setEmail] = useState(''); // State for email input
    const [contactToEdit, setContactToEdit] = useState(null); // State for editing a contact

    // Fetch contacts from the backend
    const fetchContacts = async () => {
        const response = await axios.get(API_URL);
        setContacts(response.data);
    };

    // Handle form submission for adding or updating a contact
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (contactToEdit) {
                // Update the existing contact
                await axios.patch(`${API_URL}/${contactToEdit.id}`, { name, address, phoneNumber, email });
            } else {
                // Create a new contact
                await axios.post(API_URL, { name, address, phoneNumber, email });
            }
            clearForm(); // Clear the form after submission
            fetchContacts(); // Fetch updated contacts
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    // Handle editing a contact
    const handleEdit = (contact) => {
        setContactToEdit(contact);
        setName(contact.name);
        setAddress(contact.address);
        setPhoneNumber(contact.phoneNumber);
        setEmail(contact.email);
    };

    // Handle deleting a contact
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`); // Delete contact from the backend
            fetchContacts(); // Fetch updated contacts
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    // Clear the form inputs
    const clearForm = () => {
        setContactToEdit(null);
        setName('');
        setAddress('');
        setPhoneNumber('');
        setEmail('');
    };

    // Fetch contacts when the component mounts
    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h1>Contact Management</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">{contactToEdit ? 'Update Contact' : 'Add Contact'}</button>
                <button type="button" onClick={clearForm} style={{ marginLeft: '10px' }}>Clear</button>
            </form>
            <h2>Contacts List</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {contacts.map(contact => (
                    <li key={contact.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <span><strong>Name:</strong> {contact.name}</span><br />
                        <span><strong>Address:</strong> {contact.address}</span><br />
                        <span><strong>Phone:</strong> {contact.phoneNumber}</span><br />
                        <span><strong>Email:</strong> {contact.email}</span><br />
                        <button style={{ marginLeft: '10px', border: '2px solid blue', color: 'black', backgroundColor: 'white' }} onClick={() => handleEdit(contact)}>Edit</button>
                        <button onClick={() => handleDelete(contact.id)} style={{ marginLeft: '10px', border: '2px solid red', color: 'black', backgroundColor: 'white' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
