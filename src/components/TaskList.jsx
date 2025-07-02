"use client";
import styles from "./list.module.css"
import {formatDate, truncateText} from "../lib/utils"
import { FcInfo } from "react-icons/fc";
import { FcEmptyTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { ModalDelete } from "./modals/ModalDelete";
import { useState } from "react";
import Link from "next/link";
import { deleteTask } from "@/lib/taskService";

const TaskList = ({ tasks , onChange}) => {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, task: null })
  

  if (tasks.length === 0) {
    return (
      <div className={styles.listEmpty}>
        <div>
          <h3>No hay tareas disponibles</h3>
          <p>Agrega algunas tareas para verlas aquí</p>
        </div>
      </div>
    )
  }

  const handleDeleteClick = (task) => {
    setDeleteModal({ isOpen: true, task })
  }

  const handleConfirmDelete = async (taskId) => {
    try{
      await deleteTask(taskId);
      alert('Tarea eliminada correctamente');
      onChange(); 
    }catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea');
    }
  }

  return (
    <>
    <div className={styles.list}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Tareas</h2>
        <button className={styles.btnAgregar}><Link href="/tasks/form">Agregar una tarea</Link></button>
        <div className={styles.summary}>
          <span className={styles.count}>Total: {tasks.length} tareas</span>
          <span className={styles.completed}>Completadas: {tasks.filter((task) => task.completed).length}</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th colSpan={3}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={`${task.completed ? styles.completed : ""}`}>
                <td>
                  <span className={styles.idBadge}>#{task.id}</span>
                </td>
                <td>
                  <div>
                    <span
                      className={`${styles.text} ${task.completed ? styles.completed : ""}`}
                    >
                      {task.title}
                    </span>
                  </div>
                </td>
                <td>
                  <div title={task.description}>
                    <span className={styles.descriptionText}>{truncateText(task.description)}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.status}>
                  <span
                    className={`${styles.statusBadge} ${task.completed ? styles.completed : styles.pending}`}
                  >
                    {task.completed ? (
                      <>
                        <span className={styles.statusIcon}>✓</span>
                        Completada
                      </>
                    ) : (
                      <>
                        <span className={styles.statusIcon}>⏳</span>
                        Pendiente
                      </>
                    )}
                  </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className={styles.dateText}>{formatDate(task.createdAt)}</span>
                  </div>
                </td>
                {/* Acciones  */}
                <td className={styles.actions}>
                  <button><Link href={`/tasks/${task.id}`}><FcInfo size={24} /></Link></button>
                </td>
                <td className={styles.actions}>
                  <button><Link href={`/tasks/form/${task.id}`}><FcEditImage size={24}/></Link></button>
                </td>
                <td className={styles.actions}>
                  <button onClick={() => handleDeleteClick(task)}><FcEmptyTrash  size={24}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <ModalDelete
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, task: null })}
        onConfirm={handleConfirmDelete}
        task={deleteModal.task}
      />
    </>
  )
}

export default TaskList
