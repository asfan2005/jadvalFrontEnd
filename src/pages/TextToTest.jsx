import React, { useState } from 'react';
import api from '../services/api';

function TextToTest() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const validateTestFormat = (text) => {
    const lines = text.trim().split('\n');
    let questionCount = 0;
    let answerCount = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (/^\d+[\.\)]/.test(trimmedLine)) {
        questionCount++;
      }
      if (/^[A-Da-d][\.\)]/.test(trimmedLine)) {
        answerCount++;
      }
    }

    if (questionCount === 0) {
      throw new Error("Test savollari topilmadi. Har bir savol raqam bilan boshlanishi kerak (1. yoki 1))");
    }

    if (answerCount === 0) {
      throw new Error("Test javoblari topilmadi. Har bir javob A), a), A. yoki a. formatida bo'lishi kerak");
    }

    if (answerCount / questionCount !== 4) {
      throw new Error("Har bir savol uchun to'rtta javob (A/a, B/b, C/c, D/d) bo'lishi kerak");
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      if (!text.trim()) {
        throw new Error("Iltimos, matn kiriting!");
      }

      try {
        validateTestFormat(text);
      } catch (formatError) {
        setError(formatError.message);
        return;
      }

      setIsLoading(true);

      try {
        const blob = await api.convertTextToTest(text);
        
        // Faylni yuklab olish
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tests_${Date.now()}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        setText('');
        alert("Test muvaffaqiyatli yaratildi!");
      } catch (apiError) {
        setError(apiError.message);
      }

    } catch (error) {
      console.error('Xatolik:', error);
      setError(error.message || 'Kutilmagan xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleText = `1. Uzluksiz ta'limda qanday pedagogik texnologiyalarni qo'llash muhim?
A) Interfaol va innovatsion pedagogik texnologiyalar
B) Faqat nazariy texnologiyalarni qo'llash
C) Faoliyatni passiv tarzda o'tkazish
D) O'quvchilarga faqat yozma materiallar taqdim etish

2) Pedagogik innovatsiyalarni uzluksiz ta'limda qo'llashning asosiy maqsadi nima?
a. O'quvchilarni rivojlantirish va ta'limni samarali qilish
b. Faoliyatni faqat testlar yordamida boshqarish
c. Faoliyatni passiv tarzda o'tkazish
d. O'quvchilarning faqat fizik qobiliyatlarini oshirish

3. Ta'lim tizimida qanday yangiliklar joriy etilmoqda?
A. Raqamli texnologiyalar
B. Zamonaviy usullar
C. Yangi standartlar
D. Innovatsion yondashuvlar`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
              Matnni Testga O'girish
            </h1>
            <p className="text-gray-600">
              Test matnini kiritib, Word formatida yuklab oling
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Format Guide Section */}
            <div className="mb-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Namuna ko'rish
                </button>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Qo'llab-quvvatlanadigan formatlar:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">Savol formati:</h4>
                      <ul className="list-disc ml-4 text-gray-600 space-y-1">
                        <li>1. Savol matni?</li>
                        <li>1) Savol matni?</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">Javob formati:</h4>
                      <ul className="list-disc ml-4 text-gray-600 space-y-1">
                        <li>A) yoki a) javob</li>
                        <li>A. yoki a. javob</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-6 border-2 rounded-xl mb-4 h-80 resize-none focus:ring-2 
                  focus:ring-green-500 focus:border-green-500 transition-all duration-300
                  text-gray-700 bg-gray-50 hover:bg-white"
                  placeholder="Testlarni quyidagi formatda kiriting:

1. Savol matni?
A) To'g'ri javob
B) Noto'g'ri javob
C) Noto'g'ri javob
D) Noto'g'ri javob"
                  disabled={isLoading}
                />
                {text && (
                  <button
                    type="button"
                    onClick={() => setText('')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Yuklanmoqda...
                  </div>
                ) : (
                  "Testga o'girish"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Namuna</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-6 rounded-xl border border-gray-100">
              {sampleText}
            </pre>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setText(sampleText);
                  setShowModal(false);
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Nusxa olish
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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

// CSS animatsiyalar uchun
const styles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-in-out;
  }
`;

// Style tegini qo'shish
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TextToTest;