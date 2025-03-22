import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = {
  // Fayl yuklash
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${BASE_URL}/process-file-tests`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Server xatosi: ${response.status}`);
    }
    
    return response.blob();
  },

  // Matnni testga o'girish
  convertTextToTest: async (text) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/process-text-tests`,
        data: { text },
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
      });

      if (response.status === 200) {
        return new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
      }

      throw new Error('Serverdan kutilmagan javob');
      
    } catch (error) {
      if (error.response) {
        // Xato javobni tekshirish
        if (error.response.data) {
          try {
            // ArrayBuffer'ni string'ga o'girish
            const text = new TextDecoder().decode(error.response.data);
            const errorData = JSON.parse(text);
            throw new Error(errorData.error || 'Serverda xatolik yuz berdi');
          } catch (e) {
            throw new Error('Testlar formati noto\'g\'ri. Iltimos tekshirib qaytadan urinib ko\'ring.');
          }
        }
      }
      throw new Error('Server bilan bog\'lanishda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    }
  },

  // Matnni slaydga o'girish
  convertTextToSlide: async (text) => {
    const response = await fetch(`${BASE_URL}/process-text-pptx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text.trim() })
    });

    if (!response.ok) {
      throw new Error(`Server xatosi: ${response.status}`);
    }

    return response.blob();
  },

  // Matnni Word formatiga o'girish
  convertTextToWord: async (text) => {
    const response = await axios.post(
      `${BASE_URL}/convert-to-word`,
      { text: text.trim() },
      { responseType: 'blob' }
    );
    return response.data;
  }
};

export default api;