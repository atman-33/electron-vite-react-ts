import { TodoDomain } from '../../../../domain/models/todo/todo-domain';

export class TodoDto {
  public readonly id: string;
  public readonly content: string;
  public readonly deadline: Date | null;
  public readonly status: number;
  public readonly userId: string;
  public readonly todoType!: {
    id: string;
    name: string;
    sortOrder: number;
  };

  constructor(todo: TodoDomain) {
    this.id = todo.id.value;
    this.content = todo.content.value;
    this.deadline = todo.deadline.value;
    this.status = todo.status.value;
    this.userId = todo.userId.value;
    this.todoType = {
      id: todo.todoType.id.value,
      name: todo.todoType.name.value,
      sortOrder: todo.todoType.sortOrder.value
    };
  }
}
