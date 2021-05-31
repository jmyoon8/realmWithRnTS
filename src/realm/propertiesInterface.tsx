

//realm properties interfacez
export interface todoProperties{
    _id?:number,
    name?:string,
    creationDate?:Date
}

//compoenet props interface
export interface headerComponentProps{
    title?:string,
    isvisible?:any,
    sortState?:any,
    hasDeleteAllButton?:any,
    ref?:any
    
}

export interface popupComponentRecivePropsType{
    id?:number,
    ref?:any,
    isvisible?:any,
    showForAdd:boolean
}

export interface flatListProps{
    item?:{_id:number, name:string, creationDate:Date},
    itemIndex?:any,
    popupDialogComponent?:any,
    onPressItem?:any
}