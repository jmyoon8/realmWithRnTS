import Realm from "realm";

export const TODO_SCHEMA = "TODO";
export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int", //primary key
    name: { type: "string", indexed: true },
    done: { type: "bool", defalut: false },
  },
};
export const TODOLIST_SCHEMA = "TodoList";
export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int", //primary key
    name: "string",
    creationDate: "date",
    todos: { type: "list", objectType: TODOLIST_SCHEMA },
  },
};
const databaseOption = {
  path: "todoListApp.realm",
  schema: [TodoListSchema, TodoSchema],
  schemaVersion: 0, //optional
};
export const insertNewTodoList = (newTodoList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          realm.create(TODOLIST_SCHEMA, newTodoList);
          resolve(newTodoList);
        });
      })
      .catch((err) => reject(err));
  });
export const updateTodoList = (todoList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList.id
          );
          updatingTodoList.name = todoList.name;
          resolve();
        });
      })
      .catch((err) => reject(err));
  });
export const deleteTodoList = (todoListId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let deletingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoListId
          );
          realm.delete(deletingTodoList);
          resolve();
        });
      })
      .catch((err) => reject(err));
  });
