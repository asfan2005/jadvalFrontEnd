import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  const features = [
    {
      title: "📁 Fayl orqali test",
      description: "MatnUsta yordamida Word yoki Text faylidan test yarating",
      link: "/file-upload",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "📝 Matn orqali test",
      description: "MatnUsta bilan to'g'ridan-to'g'ri matn kiritib test yarating",
      link: "/text-to-test",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "🎯 PowerPoint slaydlar",
      description: "MatnUsta yordamida matnni PowerPoint slaydalarga aylantiring",
      link: "/text-to-slide",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "📄 Word hujjat",
      description: "MatnUsta bilan matnni Word formatiga o'tkazing",
      link: "/text-to-word",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    {
      title: (
        <span>
          <FontAwesomeIcon icon={faFilePdf} className="text-red-500 mr-2" />
          PDF dan Word
        </span>
      ),
      description: "MatnUsta yordamida PDF fayllarni Word formatiga o'tkazing",
      link: "/pdf-to-word",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    },
    {
      title: (
        <span>
          <FontAwesomeIcon icon={faFileWord} className="text-blue-500 mr-2" />
          Word dan PDF
        </span>
      ),
      description: "MatnUsta bilan Word fayllarni PDF formatiga o'tkazing",
      link: "/word-to-pdf",
      buttonColor: "bg-teal-600 hover:bg-teal-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MatnUsta
          </h1>
          <p className="text-gray-700 text-center mb-4 text-2xl font-semibold">
            Matnlaringizga Professional Yondashuv
          </p>
          <div className="space-y-2 mb-12">
            <p className="text-gray-600 text-center text-xl">
              Bir marta yarating, turli formatlarda foydalaning
            </p>
            <p className="text-gray-600 text-center text-xl italic">
              Test, PowerPoint, Word - barchasi bir joyda!
            </p>
            <p className="text-gray-600 text-center text-lg mt-4 font-medium">
              👇 Quyidagi xizmatlardan birini tanlang va ishni boshlang
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {feature.description}
                </p>
                <Link 
                  to={feature.link}
                  className={`inline-block ${feature.buttonColor} text-white px-6 py-3 rounded-lg transition-all duration-300 text-lg font-medium hover:scale-105`}
                >
                  Boshlash
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;