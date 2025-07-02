'use client'
import React from 'react'
import styles from './form.module.css'
import {formatDate} from "../lib/utils"
import { useRouter } from 'next/navigation';
function TaskItem({ id, title, description, completed, createdAt }) {
  const router = useRouter();
  const back = () => {
    router.push('/tasks')
  }    
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h3 className={styles.title}>Mostrar detalle de: Tarea #{id}</h3>
        <span className={styles.helpText}>Recordar que esta vista es solo para visibilidad, no se pueden editar los campos</span>
        <div className={styles.status}>
          <span
            className={`${styles.statusBadge} ${completed ? styles.completed : styles.pending}`}
          >
            {completed ? "✓ Completada" : "⏳ Pendiente"}
          </span>
        </div>
      </div>

      <form className={styles.formContent}>
        <div className={styles.fieldGroup}>
          <label  htmlFor={`title-${id}`}>
            Título de la tarea
          </label>
          <input type="text" id={`title-${id}`} value={title} readOnly />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`description-${id}`}>
            Descripción
          </label>
          <textarea id={`description-${id}`} value={description} readOnly rows="3" />
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label>Estado</label>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={completed}
                readOnly
              />
              <label className={styles.checkboxLabel}>
                Tarea completada
              </label>
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label>Fecha de creación</label>
            <input
              type="text"
              value={formatDate(createdAt)}
              readOnly
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>ID de la tarea</label>
          <input type="text" className={styles.disabled} value={`#${id}`} readOnly disabled />
        </div>
      </form>
      <button className={styles.center} onClick={() => back()}>Volver</button>
    </div>
  )
}

export default TaskItem