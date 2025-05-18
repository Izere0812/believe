import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ module_name: '', module_credits: '' });

  // Fetch modules when the component mounts
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/modules'); // Adjust the API endpoint
        console.log('Fetched modules:', res.data);  // Check the data here
        setModules(res.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  // Handle adding a new module
  const handleAddModule = async (e) => {
    e.preventDefault();

    // Ensure module_credits is a number
    const credits = parseInt(newModule.module_credits, 10);
    if (isNaN(credits)) {
      alert('Credits must be a valid number');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/modules', {
        module_name: newModule.module_name,
        module_credits: credits,
      });

      const data = res.data;
      if (res.status === 201) {
        setModules([...modules, data]);  // Add new module to state
        setNewModule({ module_name: '', module_credits: '' }); // Reset the form
      } else {
        alert(data.message || 'Failed to add module');
      }
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Failed to add module');
    }
  };

  return (
    <div className="container">
      <h2>Modules</h2>

      {/* Modules list */}
      <div>
        <h3>Modules List</h3>
        <ul>
          {modules.length > 0 ? (
            modules.map((module) => (
              <li key={module.module_id}>
                {module.module_name}: {module.module_credits} Credits
              </li>
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </ul>
      </div>

      {/* Add module form */}
      <div>
        <h3>Add Module</h3>
        <form onSubmit={handleAddModule}>
          <input
            type="text"
            placeholder="Module Name"
            value={newModule.module_name}
            onChange={(e) => setNewModule({ ...newModule, module_name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Module Credits"
            value={newModule.module_credits}
            onChange={(e) => setNewModule({ ...newModule, module_credits: e.target.value })}
            required
          />
          <button type="submit">Add Module</button>
        </form>
      </div>
    </div>
  );
};

export default Modules;
