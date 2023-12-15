import { useRef, useState } from "react"

function FormNoControlado() {
    
    const formulario = useRef(null)

    var [error, setError] = useState("TODO CORRECTO")

    /*
    var error = "TODO CORRECTO"
    function setError(nuevoError) {
        error = nuevoError
    }
    */
   
   
    function validarForm(Nombre, Descripcion, Estado) {
        if ( !Nombre.trim() && !Descripcion.trim() && !Estado.trim() ) {
            setError("TIENE TODOS LOS CAMPOS EN BLANCO!!!!!!!!")
            return
        }
        if ( !Nombre.trim() ) {
            setError("TIENES EL CAMPO NOMBRE EN BLANCO!!!")
            return
        }
        if ( !Descripcion.trim() ) {
            setError("TIENES EL CAMPO DESCRIPCION EN BLANCO!!!")
            return
        }
        if ( !Estado.trim() ) {
            setError("TIENES EL ÚLTIMO CAMPO EN BLANCO!!!")
            return
        }
        setError("TODO CORRECTO")
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("click")
        console.log(formulario)
        const datos = new FormData(formulario.current)

        const { Nombre, Descripcion, Estado } = Object.fromEntries([...datos.entries()])


        validarForm(Nombre, Descripcion, Estado)
        
        
    }


    return(
        <>
            <form onSubmit={ handleSubmit } ref={ formulario }>
                <input name="Nombre" type="text" placeholder="Nombre de la tarea" className="form-control mb-2" />
                <textarea name="Descripcion" placeholder="Introduce la descripcion de la tarea" className="form-control mb-2" ></textarea>
                <select name="Estado" className="form-control mb-2" >
                    <option value="">Selecciona</option>                    
                    <option value="pendiente">Pendiente</option>                    
                    <option value="completada">Completada</option>                    
                </select>
                <button type="submit" className="btn btn-primary">Añadir tarea</button>
            </form>

            <p>{ error }</p>
        </>
    )
}

export default FormNoControlado