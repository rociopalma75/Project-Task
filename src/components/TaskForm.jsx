'use client'

import { useState } from 'react'
import styles from './form.module.css'
import {formatDate, getCurrentDateTime, validateDate} from "../lib/utils"
import { useRouter } from 'next/navigation';
import { postTask, updateTask } from '@/lib/taskService';

function TaskForm({task, isAlta}) {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    completed: task?.completed || false,
    createdAt: task?.createdAt
      ? new Date(task.createdAt).toISOString().slice(0, 16)
      : getCurrentDateTime(),
  })
    // Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const closeForm = () => {
    router.push('/tasks')
  }

    // Validar formulario
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio"
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres"
    }

    if (formData.createdAt && !validateDate(formData.createdAt)) {
      newErrors.createdAt = "La fecha no puede ser posterior a hoy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


 const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    setIsSubmitting(true);
    let mensaje = "";

    try {
      if(isAlta) 
      {
        await postTask({
            title: formData.title,
            description: formData.description,
            completed: formData.completed,
            createdAt: formData.createdAt,
          });
        mensaje = "Tarea creada correctamente";
      }else 
      {
        await updateTask(task.id, {
            title: formData.title,
            description: formData.description,
            completed: formData.completed,
            createdAt: formData.createdAt,
          });
        mensaje = "Tarea actualizada correctamente";
      }

      alert(mensaje);
      router.push('/tasks'); // redirigí a donde necesites
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        {!isAlta ? <h3 className={styles.title}>Tarea #{formData.id}</h3> : <h3 className={styles.title}>Crear Nueva Tarea</h3>}
        <div className={styles.status}>
          <span
            className={`${styles.statusBadge} ${formData.completed ? styles.completed : styles.pending}`}
          >
            {formData.completed ? "✓ Completada" : "⏳ Pendiente"}
          </span>
        </div>
      </div>

      <form className={styles.formContent}  onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label htmlFor="form-title">
            Título de la tarea
          </label>
          {errors.title && <span className={styles.error}>{errors.title}</span>}
          <input type="text" id="form-title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="form-descrition">
            Descripción
          </label>
          <textarea id="form-descrition" value={formData.description} rows="3" placeholder='Ingrese la descripción de la tarea..' onChange={(e) => handleInputChange("description", e.target.value)}/>
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label>Estado</label>
            <div className={`${styles.checkboxGroup} ${isAlta ? styles.disabled : ''}`}>
              <input
                type="checkbox"
                id='form-completed'
                className={styles.checkbox}
                checked={formData.completed}
                readOnly={isAlta}
                disabled={isAlta}
                onChange={(e) => handleInputChange("completed", e.target.checked)}
              />
              <label className={styles.checkboxLabel} htmlFor='form-completed'>
                {isAlta ? "Tarea Pendiente" : "Tarea Completada"}
              </label>
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label>Fecha de creación</label>
            <input
              type="datetime-local"
              value={formData.createdAt }
              max={getCurrentDateTime()}
              onChange={(e) => handleInputChange("createdAt", e.target.value)}
            />
            {errors.createdAt && <span className={styles.error}>{errors.createdAt}</span>}
            <span className={styles.helpText}>
              Recordar que la fecha no puede ser posterior a hoy.
            </span>
          </div>
        </div>

       {!isAlta && 
         <div className={styles.fieldGroup}>
          <label>ID de la tarea</label>
          <input type="text" value={`#${formData.id}`} readOnly disabled className={styles.disabled} />
        </div>
       }
      {/* Botones de Confirmar y Cancelar  */}
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => closeForm()}>
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.primary}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                {isAlta ? "Creando..." : "Guardando..."}
              </>
            ) : (
              <>
                {isAlta ? "Crear Tarea" : "Guardar Cambios"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm