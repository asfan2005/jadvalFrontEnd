import React, { useState } from 'react';
import api from '../services/api';

function TextToTest() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (!text.trim()) {
        alert("Iltimos, matn kiriting!");
        return;
      }

      setIsLoading(true);
      const blob = await api.convertTextToTest(text);

      // Faylni yuklab olish
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `tests_${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setText('');
      alert("Test muvaffaqiyatli yaratildi!");

    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const sampleText = `Uzluksiz ta'limda qanday pedagogik texnologiyalarni qo'llash muhim?
a) Interfaol va innovatsion pedagogik texnologiyalar
b) Faqat nazariy texnologiyalarni qo'llash
c) Faoliyatni passiv tarzda o'tkazish
d) O'quvchilarga faqat yozma materiallar taqdim etish

Pedagogik innovatsiyalarni uzluksiz ta'limda qo'llashning asosiy maqsadi nima?
a) O'quvchilarni rivojlantirish va ta'limni samarali qilish
b) Faoliyatni faqat testlar yordamida boshqarish
c) Faoliyatni passiv tarzda o'tkazish
d) O'quvchilarning faqat fizik qobiliyatlarini oshirish

Ta'limda global tendensiyalarning ta'lim jarayoniga ta'siri qanday?
a) Zamonaviy pedagogik yondashuvlar va metodlar kiritilishi
b) Faoliyatni faqat jismoniy mashqlar asosida o'tkazish
c) O'quvchilarga faqat nazariy bilimlarni berish
d) O'qituvchilarning ishini cheklash`;

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Matnni Testga O'girish
        </h1>
        <div className="mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Namuna ko'rish
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4 h-64 resize-none focus:ring-2 
            focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            placeholder="Matningizni bu yerga kiriting..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-4 rounded-lg font-semibold transition-all duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? "Yuklanmoqda..." : "Testga o'girish"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Namuna</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
              {sampleText}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setText(sampleText);
                  setShowModal(false);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
              >
                Nusxa olish
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
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

export default TextToTest;