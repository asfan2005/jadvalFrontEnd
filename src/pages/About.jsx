import React from 'react';
import { FaUsers, FaLaptopCode, FaRegLightbulb, FaPhoneAlt, FaEnvelope, FaTelegram, FaInstagram, FaFileWord, FaFilePdf, FaImage, FaExchangeAlt, FaDatabase, FaHeadset } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha qismi */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Biz haqimizda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bizning jamoa innovatsion texnologiyalar orqali sizning biznesingizni 
            rivojlantirishga yordam beradi
          </p>
        </div>

        {/* Asosiy ma'lumotlar */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FaUsers className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Professional Jamoa</h3>
            <p className="text-gray-600">
              Tajribali mutaxassislardan tashkil topgan jamoamiz sizning 
              loyihangizni eng yuqori sifatda amalga oshiradi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <FaLaptopCode className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Zamonaviy Texnologiyalar</h3>
            <p className="text-gray-600">
              Eng so'nggi texnologiyalardan foydalangan holda innovatsion 
              yechimlarni taklif etamiz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <FaRegLightbulb className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Kreativ Yondashuv</h3>
            <p className="text-gray-600">
              Har bir loyihaga individual yondashuv va kreativ g'oyalar bilan 
              ishlaymiz.
            </p>
          </div>
        </div>

        {/* Qo'shimcha ma'lumot */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            Bizning Imkoniyatlar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Word formatiga o'tkazish */}
            <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaFileWord className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">Matnlarni Word formatiga o'tkazish</span>
            </div>

            {/* PDF tahrirlash */}
            <div className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaFilePdf className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">PDF fayllarni tahrirlash</span>
            </div>

            {/* Rasmlarni qayta ishlash */}
            <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaImage className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">Rasmlarni qayta ishlash</span>
            </div>

            {/* Fayllarni konvertatsiya */}
            <div className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaExchangeAlt className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">Fayllarni konvertatsiya qilish</span>
            </div>

            {/* Ma'lumotlarni saqlash */}
            <div className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaDatabase className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">Ma'lumotlarni saqlash</span>
            </div>

            {/* Texnik yordam */}
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-lg group-hover:scale-110 transition-transform">
                <FaHeadset className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-gray-700">24/7 texnik yordam</span>
            </div>
          </div>
        </div>

        {/* Kontakt ma'lumotlari */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Biz bilan bog'laning
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Chap panel - Kontakt ma'lumotlari */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <FaPhoneAlt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <a 
                      href="tel:+998918218195" 
                      className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors hover:underline"
                    >
                      +998 91 821 81 95
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group mt-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <FaEnvelope className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href="mailto:asfan.webdeloper@gmail.com" 
                      className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors hover:underline"
                    >
                      asfan.webdeloper@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* O'ng panel - Ijtimoiy tarmoqlar */}
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Ijtimoiy tarmoqlarda kuzating
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://t.me/fullStackBuxoro" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <FaTelegram className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://t.me/fullStackBuxoro" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <FaInstagram className="w-6 h-6 text-white" />
                  </a>
                </div>
                
                {/* Qo'shimcha ma'lumot */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Bizni Telegram va Instagram'da kuzatib boring
                  </p>
                  <a 
                    href="https://t.me/fullStackBuxoro" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    @fullStackBuxoro
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Qo'shimcha ma'lumot paneli */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Bizning afzalliklarimiz
              </h3>
              <p className="text-lg text-blue-100">
                Professional xizmatlar, zamonaviy yechimlar va individual yondashuv
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-lg">
                <div className="text-4xl mb-4">⚡️</div>
                <h4 className="text-xl font-semibold mb-2">Tezkor</h4>
                <p className="text-center text-blue-100">Loyihalarni o'z vaqtida yakunlaymiz</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-lg">
                <div className="text-4xl mb-4">💎</div>
                <h4 className="text-xl font-semibold mb-2">Sifatli</h4>
                <p className="text-center text-blue-100">Yuqori sifatli xizmatlar</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-lg">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold mb-2">Innovatsion</h4>
                <p className="text-center text-blue-100">Zamonaviy texnologiyalar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;