import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Form, ButtonGroup} from 'react-bootstrap'
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faPencil, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function TodoList ({todo, setTodo}) {

    const [edit, setEdit] =useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFiltered] = useState(todo)



    useEffect( ()=> {
        setFiltered(todo)
    }, [todo])

    function todoFilter (status) {
        if (status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered (newTodo)
        }
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id != id)
        setTodo(newTodo)

    }

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if(item.id == id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }

    function editTodo(id, title) {
        setEdit(id)
        setValue(title)
    }

    function saveTodo(id) {
        let newTodo = [...todo].map(item => {
            if (item.id == id) {
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }



    return(
        <div>
            <Row>
                <Col className={s.filter}>
                    <ButtonGroup aria-label="Basic example" className={s.btns}>
                        <Button variant="info" onClick={ ()=>todoFilter('all')}>Все</Button>
                        <Button variant="warning" onClick={ ()=>todoFilter(true)}>Невыполненные</Button>
                        <Button variant="success" onClick={ ()=>todoFilter(false)}>Готовые</Button>
                    </ButtonGroup>
                </Col>
            </Row>

            {
                filtered.map( item => (
                    <div key={item.id} className={s.listItems}>
                        {
                            edit == item.id ?
                                <div>
                                    <input value={value} onChange={(e)=>setValue(e.target.value)}/>
                                </div> :
                                <div className={!item.status ? s.close : ''}> {item.title} </div>
                        }

                        {
                            edit == item.id ?
                                <div>
                                    <Button onClick={ ()=>saveTodo(item.id)} size='sm'><FontAwesomeIcon icon={faPenToSquare}/></Button>
                                </div>:
                                <div>
                                    <Button onClick={ () => deleteTodo(item.id)} ><FontAwesomeIcon icon={faTrashCan}/></Button>
                                    <Button onClick={ () => editTodo(item.id, item.title)} className={s.btn}><FontAwesomeIcon icon={faPencil} /></Button>
                                    <Button onClick={ () => statusTodo(item.id)} className={s.btn}>
                                        {
                                            item.status ? <FontAwesomeIcon icon={faCheck} /> :  <FontAwesomeIcon icon={faXmark} />
                                        }
                                    </Button>
                                </div>
                        }
                    </div>
                ))
            }

        </div>
    )
}

export default TodoList