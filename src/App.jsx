import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Writing from './pages/Writing'
import WritingPost from './pages/WritingPost'
import Work from './pages/Work'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<WritingPost />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
