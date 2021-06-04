import Realm from "realm";

//list에 들어갈 type
export const TODO_SCHEMA = "TODO";
export const TODOLIST_SCHEMA = "TodoList";

export const TodoSchema = {
  name: TODO_SCHEMA,
  properties: {
    _id: "int", //primary key
    name: { type: "string", indexed: true },
    done: { type: "bool", defalut: false },
  },
  primaryKey: "_id",
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
  properties: {
    _id:'int', //primary key
    name: "string",
    creationDate: "date",
    todos: { type: "list", objectType: TODO_SCHEMA },
  },
  primaryKey: "_id",
};
export const databaseOption = {
  path: "default.realm",
  schema: [TodoListSchema, TodoSchema],
  schemaVersion: 5, //optional
  
};

export const insertNewTodoList = (newTodoList) =>
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


export const updateTodoList = (todoList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList._id
          );
          updatingTodoList.name = todoList.name;
          
          resolve();
        });
      })
      .catch((err) => reject(err));
  });
  
//투두 리스트 아이디를 넣으면 델리트
export const deleteTodoList = (todoListId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          //프라이머리 키로 1개의 row만 가져온다.
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

export const deleteAllTodoList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.beginTransaction()
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
          realm.delete(allTodoLists);
        realm.commitTransaction()
       
        resolve();
        
      })
      .catch((err) => reject(err));
  });


export const queryAllTodoLists = async() =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption).then((realm) => {
        // 데이터를 가져올땐 스키마의 name으로 가져온다
        let a=realm.objects(TODOLIST_SCHEMA)
        
        let b= realm.objects(TODOLIST_SCHEMA).map(value=>value)
        console.log(b)
        resolve(a)
        
        
      }).catch((err) => reject(err));
      
  });
  
  
export const findNameTodoList =async (word)=>
  new Promise((resolve,reject)=>{
    Realm.open(databaseOption).then(realm=>{
      console.log(String(word))
      let a=realm.objects(TODOLIST_SCHEMA)
      // a=a.filtered(`name  == "${word}"`)
      // a=a.filtered(`name CONTAINS[c] $0`,word) //%N 으로 인수를 정할 수 있다
  
      a=a.filtered(`
        name CONTAINS[c] "${word}"
      `)
      //sql의 like %word% 와 같다 (와일드카드)
      resolve(a)
    }).catch(err=>reject(err))
  });

  export const insertTodos2TodosList=(todoListId,newTodos)=>new Promise((resolve,reject)=>{
    Realm.open(databaseOption).then(realm=>{
      let oneList =realm.objectForPrimaryKey(TODOLIST_SCHEMA ,todoListId)
      realm.write(()=>{
          oneList.todos.push(newTodos)
          resolve(newTodos)
      })
    }).catch(err=>{
      reject(err)
    })
  })
  export const deleteTodos=(todoListId,index)=>new Promise((resolve,reject)=>{
      Realm.open(databaseOption).then(realm=>{
        let todoList=realm.objectForPrimaryKey(TODOLIST_SCHEMA,todoListId)
        
        realm.write(()=>{
          realm.delete(todoList.todos[index])
        })
      })
  })
  export const completeTodos=(todoListId,todosIndex)=>new Promise((resolve,reject)=>{
    Realm.open(databaseOption).then(realm=>{
      let todolist=realm.objectForPrimaryKey(TODOLIST_SCHEMA,todoListId)
      realm.write(()=>{
        todolist.todos[todosIndex].done=!todolist.todos[todosIndex].done
      })
    })
  })
export default new Realm(databaseOption)