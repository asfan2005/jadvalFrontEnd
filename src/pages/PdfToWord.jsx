import React, { useState } from 'react';
import { FaFileUpload, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function PdfToWord() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error("Faqat PDF fayl yuklang!");
      event.target.value = null;
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.warning("Iltimos, PDF faylni tanlang");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' nomiga o'zgartirdik

    try {
      const response = await axios.post(
        'http://localhost:5000/api/convert-pdf-to-word',
        formData,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile.name.replace('.pdf', '')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Fayl muvaffaqiyatli yuklab olindi!");
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      toast.error("Faylni konvertatsiya qilishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          PDF dan Word ga o'tkazish
        </h1>
        
        <div className="flex flex-col items-center space-y-8">
          <label 
            htmlFor="file-upload" 
            className={`cursor-pointer flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaFileUpload className="mr-3 text-xl" />
            <span className="text-lg font-semibold">PDF faylni tanlang</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          {selectedFile && (
            <div className="w-full space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  Tanlangan fayl: <span className="font-semibold">{selectedFile.name}</span>
                </p>
              </div>
              
              <button 
                onClick={handleConvert}
                disabled={loading}
                className={`w-full flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Konvertatsiya qilinmoqda...</span>
                  </div>
                ) : (
                  <>
                    <FaDownload className="mr-3" />
                    Word ga o'tkazish
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfToWord;