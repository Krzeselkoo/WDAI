import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog.tsx'
import Article from './components/Article.tsx'
import Dodaj from './pages/Dodaj.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="article/:id" element={<Article />} />
            <Route path="/dodaj" element={<Dodaj />} />
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
