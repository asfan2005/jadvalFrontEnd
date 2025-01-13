import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineFilePdf } from 'react-icons/ai';
import axios from 'axios';

function WordToPdf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.size / 1024 / 1024) > 10) {
      setError("Fayl hajmi 10MB dan oshmasligi kerak!");
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError("Iltimos, avval faylni tanlang!");
      return;
    }

    try {
      setConverting(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', selectedFile);

      // Faylni yuborish
      const response = await axios.post('http://localhost:5000/api/word-to-pdf/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // PDF ni yuklab olish
        const downloadResponse = await axios.get(
          `http://localhost:5000/api/word-to-pdf/download/${response.data.filename}`,
          { responseType: 'blob' }
        );

        // Faylni yuklab olish
        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${selectedFile.name.split('.')[0]}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        // Formani tozalash
        setSelectedFile(null);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Konvertatsiya jarayonida xatolik yuz berdi");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Word faylni PDF formatiga o'tkazish
          </h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-500 transition-colors">
              <FiUpload className="w-12 h-12 text-gray-400 mb-4" />
              <label className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Fayl tanlash
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-gray-600">
                  Tanlangan fayl: {selectedFile.name}
                </p>
              )}
            </div>

            <button
              onClick={handleConvert}
              disabled={!selectedFile || converting}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-md text-white font-medium
                ${!selectedFile || converting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
                } transition-colors`}
            >
              <AiOutlineFilePdf className="w-6 h-6" />
              <span>
                {converting ? "Konvertatsiya qilinmoqda..." : "PDF ga o'tkazish"}
              </span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Qo'llab-quvvatlanadigan formatlar: .doc, .docx</p>
            <p className="mt-2">Maksimal fayl hajmi: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordToPdf;