import React, { useState } from 'react';
import api from '../services/api';

function TextToSlide() {
  const [slideText, setSlideText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!slideText.trim()) {
        alert("Iltimos, matn kiriting!");
        return;
      }

      setIsLoading(true);
      const blob = await api.convertTextToSlide(slideText);

      // Faylni yuklab olish
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `presentation_${Date.now()}.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setSlideText('');
      alert("Slayd muvaffaqiyatli yaratildi!");

    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8 animate-fade-in">
          Matnni Slaydga O'girish
        </h1>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Matn kiriting
                </label>
                <textarea
                  value={slideText}
                  onChange={(e) => setSlideText(e.target.value)}
                  className="w-full p-4 border-2 border-purple-100 rounded-lg h-72 
                    resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 ease-in-out
                    placeholder:text-gray-400"
                  placeholder="Slayd uchun matningizni bu yerga kiriting..."
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg
                  transform transition-all duration-200 ease-in-out
                  ${isLoading 
                    ? 'bg-gray-300 cursor-not-allowed opacity-70' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Slayd yaratilmoqda...</span>
                  </div>
                ) : (
                  "Slayd yaratish"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TextToSlide;