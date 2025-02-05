import React from 'react';

function NoteList({ notes, onNoteClick, onNoteDelete }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note._id}
          className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {note.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onNoteDelete(note._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              onClick={() => onNoteClick(note)}
              className="mt-2 cursor-pointer"
            >
              <p className="text-sm text-gray-600 line-clamp-3">
                {note.content}
              </p>
              {note.type === 'audio' && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Audio Note
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
