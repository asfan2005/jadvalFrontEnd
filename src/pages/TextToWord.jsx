import React, { useState } from 'react';
import api from '../services/api';

function TextToWord() {
  const [wordText, setWordText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!wordText.trim()) {
        alert("Iltimos, matn kiriting!");
        return;
      }

      setIsLoading(true);
      const blob = await api.convertTextToWord(wordText);

      // Faylni yuklab olish
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `document_${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setWordText('');
      alert("Matn muvaffaqiyatli Word formatiga o'tkazildi!");

    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 transform hover:scale-105 transition-transform">
          Matnni Word Formatiga O'tkazish
        </h1>
        
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <textarea
                value={wordText}
                onChange={(e) => setWordText(e.target.value)}
                className="w-full p-5 border border-gray-200 rounded-lg h-80 resize-none
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-all duration-200 ease-in-out
                          text-gray-700 text-lg
                          placeholder-gray-400"
                placeholder="Word formatiga o'tkazmoqchi bo'lgan matningizni kiriting..."
                disabled={isLoading}
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg
                  transform transition-all duration-200 ease-in-out
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:shadow-lg active:translate-y-0'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>O'tkazilmoqda...</span>
                  </div>
                ) : (
                  "Word formatiga o'tkazish"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TextToWord;