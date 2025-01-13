import React, { useState } from 'react';
import api from '../services/api';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (!selectedFile) {
        alert("Iltimos, fayl tanlang!");
        return;
      }

      // Fayl hajmini tekshirish (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Fayl hajmi 10MB dan oshmasligi kerak!");
        return;
      }

      // Fayl turini tekshirish
      const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Faqat .doc, .docx va .txt fayllari qabul qilinadi!");
        return;
      }

      setIsLoading(true);

      const blob = await api.uploadFile(selectedFile);
      
      // Faylni yuklab olish
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tests_${Date.now()}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);

      // Formani tozalash
      setSelectedFile(null);
      if (event.target) {
        event.target.reset();
      }

      alert("Fayl muvaffaqiyatli qayta ishlandi!");

    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      alert(`Xatolik yuz berdi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Fayl Yuklash Tizimi
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".doc,.docx,.txt"
              className="w-full cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Faqat .doc, .docx va .txt fayllari qabul qilinadi (max: 10MB)
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
              isLoading || !selectedFile 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Yuklanmoqda...
              </span>
            ) : "Yuklash"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileUpload;