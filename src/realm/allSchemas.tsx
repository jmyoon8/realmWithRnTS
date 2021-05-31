import Realm from "realm";
//list에 들어갈 type
export const TODO_SCHEMA = "TODO";
export const TODOLIST_SCHEMA = "TodoList";

export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: "_id",
  properties: {
    _id: "int", //primary key
    name: { type: "string", indexed: true },
    done: { type: "bool", defalut: false },
  },
};

// export class TodoListSchema extends Realm.Object{
//   static schema={
//     name:TODOLIST_SCHEMA,
//     primaryKey:'_id',
//     properties:{
//       _id:'int',
//       name:'string',
//       creationDate:'date',
//       todos:{type:'list', objectType:TODO_SCHEMA}
//     }
//   }
// }

export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: "_id",
  properties: {
    _id:'int', //primary key
    name: "string",
    creationDate: "date",
    todos: { type: "list", objectType: TODO_SCHEMA },
  },
};
const databaseOption = {
  path: "todoListApp.realm",
  schema: [TodoListSchema, TodoSchema],
  // schemaVersion: 2, //optional
  
};

export const insertNewTodoList = (newTodoList:any) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(()=>{
          realm.create(TODOLIST_SCHEMA, newTodoList);
          resolve(newTodoList);
          
        })
      
      })
      .catch((err) => reject(err));
  });


export const updateTodoList = (todoList: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let updatingTodoList: any = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList.id
          );
          updatingTodoList.name = todoList.name;
          
          resolve();
        });
      })
      .catch((err) => reject(err));
  });
  
//투두 리스트 아이디를 넣으면 델리트
export const deleteTodoList = (todoListId: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          //프라이머리 키로 1개의 row만 가져온다.
          let deletingTodoList: any = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoListId
          );
          realm.delete(deletingTodoList);
          
          resolve();
        });
      })
      .catch((err) => reject(err));
  });

export const deleteAllTodoList = () =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        realm.delete(allTodoLists);
        resolve();
        
      })
      .catch((err) => reject(err));
  });


export const queryAllTodoLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        // 데이터를 가져올땐 스키마의 name으로 가져온다
        
          // 데이터를 가져올땐 스키마의 name으로 가져온다
          
        let data=realm.objects(TODOLIST_SCHEMA)
        resolve(data)
        
        
      }).catch((err) => reject(err));
  });
export default new Realm(databaseOption)