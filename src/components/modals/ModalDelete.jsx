"use client"

import Modal from "./Modal"
import styles from "./modal.module.css"
import { FcHighPriority } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";

export const ModalDelete = ({ isOpen, onClose, onConfirm, task }) => {
  const handleConfirm = () => {
    onConfirm(task.id)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`${styles.modal} ${styles.center}`}>
        <div className={styles.modalIcon}>
            <FcHighPriority size={30}/>
        </div>

        <div className={styles.header}>
          <h3 className={styles.title}>¿Eliminar tarea?</h3>
          <p className={styles.subtitle}>Esta acción no se puede deshacer</p>
        </div>

        <div className={styles.info}>
          <div className={styles.preview}>
            <div className={styles.id}>Tarea #{task?.id}</div>
            <div className={styles.title}>{task?.title}</div>
            <div className={styles.description}>{task?.description}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.delete} onClick={handleConfirm}>
            <AiFillDelete size={20}/>
            Eliminar tarea
          </button>
        </div>
      </div>
    </Modal>
  )
}