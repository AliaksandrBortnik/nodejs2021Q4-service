interface Board {
  id: string, // uuid
  title: string,
  columns: Column[]
}

interface Column {
  id: string, // uuid
  title: string,
  order: number
}

export default Board;