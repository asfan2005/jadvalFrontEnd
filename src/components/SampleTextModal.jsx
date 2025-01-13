import React from 'react';

function SampleTextModal({ isOpen, onClose, onApply, sampleText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Namuna matn</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
          {sampleText}
        </pre>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Namunani qo'llash
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

export default SampleTextModal;