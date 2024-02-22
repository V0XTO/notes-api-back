// IMPORTS
import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>My first express app</h1>')
})

//* Get all notes 🫡
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

//* Get a single note  🫡
app.get('/api/notes/:id', (req, res, next) => {
  const id = Number(req.params.id)
  console.log({ id })

  const note = notes.find(note => note.id === id)
  console.log({ note })

  if (note) {
    res.json(note)
  }
  next()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important === 'boolean' ? note.important : false
  }
  notes = [...notes, newNote]
  res.json(newNote)
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({
    error: 'not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Create a server with node.js
/* const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notes));
}); */
