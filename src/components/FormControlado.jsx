import { useState, useEffect } from "react"

function FormControlado() {
  
  //const [isMountedEditar, setIsMountedEditar] = useState(false)
  const [isMountedListNuevo, setIsMountedListNuevo] = useState(false)
  const [empieza, setEmpieza] = useState(false)
  //const [isMountedCompletar, setIsMountedCompletar] = useState(false)
  //const [isMountedObjetoCompletar, setIsMountedObjetoCompletar] = useState(false)
  const [modifyButton, setModifyButton] = useState(false)
  const [todoEditar, setTodoEditar] = useState({})
  const [todoListNuevo, setTodoListNuevo] = useState([{}])
  const [todoCompletada, setTodoCompletada] = useState({})
  const [objetoCompletar, setObjetoCompletar] = useState({})

  var [ordena, setOrdena] = useState(0)
  
  const [todoList, setTodoList] = useState([])

  const [todo, setTodo] = useState(
    {
      id: Date.now(),
      title: "todo 01",
      description: "Description 01",
      state: "pendiente",
      priority: false
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if ( modifyButton ) {
      setModifyButton(false)

      const nuevaLista = todoList.map((diccionario) => {
        return diccionario.id === todo.id ? {...diccionario, ...todo} : diccionario
      })

      console.log(nuevaLista)

      setTodoList(nuevaLista)

      console.log(todoList)


    } else {
      setTodo({...todo, id:Date.now()})
      setTodoList([...todoList, todo])
      console.log(`Enviando ${ todo.id } ${ todo.title }, ${ todo.description }, ${ todo.state }, ${ todo.priority }`)
    }

    //setOrdena(++ordena)
  }

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setTodo({
      ...todo,
      [ name ]:type === "checkbox"? checked:value
    })    
  }

  const handleClickDelete = (e) => {
    const todoId = parseInt(e.target.parentElement.id)
    setTodoListNuevo(todoList.filter(function (item) {
      return item.id !== todoId
    }))
    //e.target.parentElement.remove()
  }
  useEffect(() => {
    setIsMountedListNuevo(true)
    if ( isMountedListNuevo ) {
      setTodoList(todoListNuevo)

      //setOrdena(++ordena)
    }
  }, [todoListNuevo])


  const handleClickEdit = (e) => {
    const todoId = parseInt(e.target.parentElement.id)
    
    setTodoEditar(todoList.filter(function (item) {
      return item.id === todoId
    })[0])
  }
  useEffect(() => {
    if ( todoEditar.id ) {
      setTodo(todoEditar)
      setModifyButton(true)

      //setOrdena(++ordena)
    }
  }, [todoEditar])

  
  const handleClickCompletada = (e) => {
    const todoId = parseInt(e.target.parentElement.id)
    console.log("encontrando objeto en la lista")
    /*setObjetoCompletar(todoList.find((item) => item.id === todoId))*/
  }
  useEffect(() => {
    if ( objetoCompletar.id ) {
      console.log("objeto antiguo cambiandole el state")
      setObjetoCompletar((objetoAntiguo) => ({
        ...objetoAntiguo,
        state : objetoAntiguo.state === "pendiente"? objetoAntiguo.state = "completada" : objetoAntiguo.state = "pendiente"
      }))

      setTodoCompletada(objetoCompletar)
    }
  }, [objetoCompletar])
  useEffect(() => {
    if ( todoCompletada.id ) {
      console.log("actualizando el todoList");
      setTodoList((prevList) => prevList.map((item) => 
        (item.id === todoCompletada.id ? todoCompletada : item))
      )
    }
  }, [todoCompletada])
  


/*
  useEffect(() => {
    setEmpieza(true)
    if ( empieza ) {
      var listaPrioridadBaja = []
      var listaPrioridadAlta = []
      var listaCompletadas = []
      var listaOrdenada = []
      todoList.forEach((item) => {
        item.state === "completada"? listaCompletadas = [...listaCompletadas, item] : 
        item.priority? listaPrioridadAlta = [...listaPrioridadAlta, item] : listaPrioridadBaja = [...listaPrioridadBaja, item]
      })

      listaPrioridadAlta = [...listaOrdenada, listaPrioridadBaja]
      listaPrioridadAlta = [...listaOrdenada, listaPrioridadAlta]
      listaPrioridadAlta = [...listaOrdenada, listaCompletadas]

      setTodoList(listaOrdenada)
    } 
  }, [ordena])*/
  




  return(
    <>
      <form onSubmit={ handleSubmit }>
        {
          modifyButton? <h3>Estás editando un TODO...</h3> : <h3>Añadir TODO</h3>
        }
        <input value={ todo.title } onChange={ handleChange } name="title" type="text" placeholder="Nombre de la tarea" className="form-control mb-2" />
        <textarea value={ todo.description } onChange={ handleChange } name="description" placeholder="Introduce la descripcion de la tarea" className="form-control mb-2" ></textarea>
        <select value={ todo.state } onChange={ handleChange } name="state" className="form-control mb-2" >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
        <h3>Priority</h3>
        <input onChange={ handleChange } type="checkbox" name="priority" className="form-control mb-2"/>
        {
          modifyButton? <button type="submit" className="btn btn-primary">Modificar tarea</button> : <button type="submit" className="btn btn-primary">Añadir tarea</button> 
        }
      </form>
      <ul>
        {
          todoList.map((item, index) => {
            return (
              <li key={ index } id={ item.id }>
                { item.state === "pendiente"? <p className="pendiente">{ item.title }</p> : <p className="completada">{ item.title }</p>}
                { item.state === "pendiente"? <p className="pendiente">{ item.description }</p> : <p className="completada">{ item.description }</p>}
                { item.state === "pendiente"? <p className="pendiente">{ item.state }</p> : <p className="completada">{ item.state }</p>}
                {
                  item.state === "pendiente"? <p className="pendiente">Prioridad { item.priority? "alta" : "baja" }</p> : <p className="completada">Prioridad { item.priority? "alta" : "baja" }</p>
                }

                <button onClick={ handleClickDelete }>Borrar TODO</button>
                <button onClick={ handleClickEdit }>Editar TODO</button>
                <button onClick={ handleClickCompletada }>Marcar como terminado</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default FormControlado