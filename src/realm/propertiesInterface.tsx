

//realm properties interfacez

export interface todosProps{
    _id?:number,
    name?:string,
    done?:boolean
    
}
export interface todoListProperties{
    _id:number|any,
    name?:string,
    creationDate?:Date,
    todos?:todosProps[]|any
}

//compoenet props interface
export interface headerComponentProps{
    isvisible?:any,
    title?:string,
    todoList?:any,
    setTodoList?:any
}

export interface popupComponentRecivePropsType{
    id?:number,
    isvisible?:any,
    showForAdd?:boolean,
    whatinsert?:string
}

export interface flatListProps{
    item?:todoListProperties,
    itemIndex?:any,
    popupDialogComponent?:any,
    onPressItem?:any,
}
