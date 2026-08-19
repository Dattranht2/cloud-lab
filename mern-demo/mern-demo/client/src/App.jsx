import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students')
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email })
      })

      if (res.ok) {
        setStudentId('')
        setName('')
        setEmail('')
        fetchStudents()
      }
    } catch (err) {
      console.error("Lỗi thêm sinh viên:", err)
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2>Quản Lý Sinh Viên</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Mã số sinh viên (MSSV)" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          placeholder="Họ và tên" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Thêm Sinh Viên
        </button>
      </form>

      <h3>Danh Sách Sinh Viên</h3>
      <ul>
        {students.map((st) => (
          <li key={st._id} style={{ marginBottom: '8px' }}>
            <strong>{st.studentId}</strong> - {st.name} ({st.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App