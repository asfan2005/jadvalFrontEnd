import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import FileUpload from './pages/FileUpload';
import TextToTest from './pages/TextToTest';
import TextToSlide from './pages/TextToSlide';
import TextToWord from './pages/TextToWord';
import HomePage from "./pages/HomePage";
import About from './pages/About';
import PdfToWord from "./pages/PdfToWord";
import WordToPdf from "./pages/WordToPdf";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/file-upload',
        element: <FileUpload />
      },
      {
        path: '/text-to-test',
        element: <TextToTest />
      },
      {
        path: '/text-to-slide',
        element: <TextToSlide />
      },
      {
        path: '/text-to-word',
        element: <TextToWord />
      },
      {
        path:"/about",
        element: <About/>
      },
      {
        path:"/pdf-to-word",
        element:<PdfToWord/>,
      },
      {
        path:"/word-to-pdf",
        element:<WordToPdf/>,
      }
    ]
  }
]);

export default router;