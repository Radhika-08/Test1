import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import NoteList from './NoteList';
import NoteModal from './NoteModal';
import CreateNote from './CreateNote';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard() {
  const { token, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes/search?q=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleNoteDelete = async (noteId) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteUpdate = async (noteId, updatedData) => {
    try {
      await axios.put(`${API_URL}/api/notes/${noteId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Note Taking App</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </div>

          <CreateNote token={token} onNoteCreated={fetchNotes} />

          <NoteList
            notes={notes}
            onNoteClick={handleNoteClick}
            onNoteDelete={handleNoteDelete}
          />

          {selectedNote && (
            <NoteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              note={selectedNote}
              onUpdate={handleNoteUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
