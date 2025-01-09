import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // 'file' yoki 'text'
  const [showModal, setShowModal] = useState(false);
  const [slideText, setSlideText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleText = `1. O'zbekiston poytaxti qaysi shahar?
a) Toshkent
b) Samarqand
c) Buxoro
d) Andijon

2. O'zbekiston mustaqillikka qaysi yilda erishgan?
a) 1991
b) 1990
c) 1989
d) 1992

3. O'zbekistonning poytaxti Toshkent shahrining aholisi qancha?
a) 2.5 million
b) 1.5 million
c) 3.5 million
d) 4.5 million`;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileSubmit = async (event) => {
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

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:5000/process-file-tests', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server xatosi: ${response.status}`);
      }

      const blob = await response.blob();
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

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    try {
        if (!text.trim()) {
            alert("Iltimos, matn kiriting!");
            return;
        }

        const response = await axios.post('http://localhost:5000/process-text-tests', 
            { text: text.trim() },
            { responseType: 'blob' }
        );

        // Faylni yuklab olish uchun
        const blob = new Blob([response.data], { 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tests_${Date.now()}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        // Formani tozalash
        setText('');
        
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleSlideSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!slideText.trim()) {
        alert("Iltimos, matn kiriting!");
        return;
      }

      const response = await fetch('http://localhost:5000/process-text-pptx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: slideText.trim() })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'presentation.pptx';
        a.click();
        window.URL.revokeObjectURL(url);
      }

      // Formani tozalash
      setSlideText('');
      
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
          {/* Chap panel */}
          <div className="h-full p-4 md:p-6 flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
              Fayl va Matn Yuklash
            </h1>

            {/* Buttonlar */}
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <button
                onClick={() => setActiveTab('file')}
                className={`w-full p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold transition-all ${
                  activeTab === 'file' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                📁 Fayl Yuklash
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`w-full p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold transition-all ${
                  activeTab === 'text' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                📝 Matn va Jadval
              </button>
              <button
                onClick={() => setActiveTab('slide')}
                className={`w-full p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold transition-all ${
                  activeTab === 'slide' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                🎯 Matn va Slayd
              </button>
            </div>

            {/* Namuna matn ko'rsatish buttoni */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all mb-4"
            >
              📋 Namuna matn ko'rish
            </button>

            {/* Yuklangan fayllar */}
            <div className="flex-1 overflow-auto">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Yuklangan Fayllar</h2>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      <div>
                        <p className="font-medium text-sm md:text-base">{file.name}</p>
                        <p className="text-xs md:text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* O'ng panel */}
          <div className="h-full border-t lg:border-l lg:border-t-0">
            <div className="h-full p-4 md:p-6">
              {activeTab === 'file' && (
                <div className="h-full flex flex-col">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Fayl Yuklash</h2>
                  <form onSubmit={handleFileSubmit} className="flex-1 flex flex-col">
                    <div className="flex-1 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center p-4 md:p-6">
                      <div className="text-center">
                        <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label className="cursor-pointer inline-flex items-center px-3 md:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                            <span className="text-sm md:text-base">
                              {selectedFile ? selectedFile.name : "Fayl tanlang"}
                            </span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              onChange={handleFileChange}
                              accept=".doc,.docx,.txt"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !selectedFile}
                      className={`mt-4 w-full p-3 md:p-4 rounded-lg font-semibold text-sm md:text-base
                        ${isLoading || !selectedFile 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      {isLoading ? "Yuklanmoqda..." : "Yuklash"}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="h-full flex flex-col">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Matn Yuklash</h2>
                  <form onSubmit={handleTextSubmit} className="flex-1 flex flex-col">
                    <textarea
                      value={text}
                      onChange={handleTextChange}
                      className="flex-1 p-3 md:p-4 rounded-lg border border-gray-300 resize-none text-sm md:text-base"
                      placeholder="Matningizni bu yerga kiriting..."
                    />
                    <button
                      type="submit"
                      className="mt-4 w-full p-3 md:p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm md:text-base"
                    >
                      Yuklash
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'slide' && (
                <div className="h-full flex flex-col">
                  <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Slayd uchun Matn</h2>
                  <form onSubmit={handleSlideSubmit} className="flex-1 flex flex-col">
                    <textarea
                      value={slideText}
                      onChange={(e) => setSlideText(e.target.value)}
                      className="flex-1 p-3 md:p-4 rounded-lg border border-gray-300 resize-none text-sm md:text-base"
                      placeholder="Slayd uchun matningizni bu yerga kiriting..."
                    />
                    <button
                      type="submit"
                      className="mt-4 w-full p-3 md:p-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 text-sm md:text-base"
                    >
                      Slayd yaratish
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Namuna matn modali */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Namuna matn</h2>
              <button 
                onClick={() => setShowModal(false)}
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
                onClick={() => {
                  setText(sampleText);
                  setActiveTab('text');
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Namunani qo'llash
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;