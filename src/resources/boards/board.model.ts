export interface Board {
  id: string, // uuid
  title: string,
  columns: Column[]
}

export interface Column {
  id: string, // uuid
  title: string,
  order: number
}