import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Marks = () => {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  const [marks, setMarks] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [trades, setTrades] = useState([]);
  const [modules, setModules] = useState([]);

  const [form, setForm] = useState({
    trainee_id: '',
    trade_id: '',
    module_id: '',
    formative_ass: '',
    comprehensive_ass: '',
    total_marks_100: 0,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!authData) {
      navigate('/login');
    } else {
      fetchMarks();
      fetchDropdownData();
    }
  }, [authData]);

  const fetchMarks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/marks');
      const data = await res.json();
      setMarks(data);
    } catch (error) {
      console.error('Failed to fetch marks:', error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [tRes, trRes, mRes] = await Promise.all([
        fetch('http://localhost:5000/api/trainees'),
        fetch('http://localhost:5000/api/trades'),
        fetch('http://localhost:5000/api/modules'),
      ]);
      const [tData, trData, mData] = await Promise.all([
        tRes.json(), trRes.json(), mRes.json()
      ]);
      setTrainees(tData);
      setTrades(trData);
      setModules(mData);
    } catch (err) {
      console.error('Dropdown data fetch error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    // Automatically calculate total
    if (name === 'formative_ass' || name === 'comprehensive_ass') {
      const f = parseFloat(updatedForm.formative_ass) || 0;
      const c = parseFloat(updatedForm.comprehensive_ass) || 0;
      updatedForm.total_marks_100 = f + c;
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `http://localhost:5000/api/marks/${editId}`
      : 'http://localhost:5000/api/marks';

    const payload = {
      ...form,
      user_id: authData?.user?.id || null,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Success');
        fetchMarks();
        setForm({
          trainee_id: '',
          trade_id: '',
          module_id: '',
          formative_ass: '',
          comprehensive_ass: '',
          total_marks_100: 0,
        });
        setEditId(null);
      } else {
        alert(data.error || 'Error occurred');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server error.');
    }
  };

  const handleEdit = (mark) => {
    setForm({
      trainee_id: mark.trainee_id,
      trade_id: mark.trade_id,
      module_id: mark.module_id,
      formative_ass: mark.formative_ass,
      comprehensive_ass: mark.comprehensive_ass,
      total_marks_100: mark.total_marks_100,
    });
    setEditId(mark.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mark?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/marks/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchMarks();
      } else {
        alert(data.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="container">
      <h2>Marks Management</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <select name="trainee_id" value={form.trainee_id} onChange={handleChange} required>
          <option value="">Select Trainee</option>
          {trainees.map(t => (
            <option key={t.id} value={t.id}>{t.first_names} {t.last_name}</option>
          ))}
        </select><br />

        <select name="trade_id" value={form.trade_id} onChange={handleChange} required>
          <option value="">Select Trade</option>
          {trades.map(t => (
            <option key={t.id} value={t.id}>{t.trade_name}</option>
          ))}
        </select><br />

        <select name="module_id" value={form.module_id} onChange={handleChange} required>
          <option value="">Select Module</option>
          {modules.map(m => (
            <option key={m.id} value={m.id}>{m.module_name}</option>
          ))}
        </select><br />

        <input
          type="number"
          name="formative_ass"
          placeholder="Formative Assessment"
          value={form.formative_ass}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="comprehensive_ass"
          placeholder="Comprehensive Assessment"
          value={form.comprehensive_ass}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="total_marks_100"
          placeholder="Total Marks (100)"
          value={form.total_marks_100}
          readOnly
        /><br />

        <button type="submit">{editId ? 'Update' : 'Add'} Marks</button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Trainee</th>
            <th>Trade</th>
            <th>Module</th>
            <th>Formative</th>
            <th>Comprehensive</th>
            <th>Total (100)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.length === 0 ? (
            <tr><td colSpan="8">No marks found</td></tr>
          ) : (
            marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.id}</td>
                <td>{mark.trainee_id}</td>
                <td>{mark.trade_id}</td>
                <td>{mark.module_id}</td>
                <td>{mark.formative_ass}</td>
                <td>{mark.comprehensive_ass}</td>
                <td>{mark.total_marks_100}</td>
                <td>
                  <button onClick={() => handleEdit(mark)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(mark.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Marks;
