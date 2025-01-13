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
    const response = await axios.post(
      `${BASE_URL}/process-text-tests`,
      { text: text.trim() },
      { responseType: 'blob' }
    );
    return response.data;
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