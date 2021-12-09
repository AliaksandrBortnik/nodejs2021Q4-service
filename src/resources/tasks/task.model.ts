export default interface Task {
  id: string, // uuid
  title: string,
  order: number,
  description: string,
  userId: string | null, // uuid or null
  boardId: string, // uuid
  columnId: string // uuid
}