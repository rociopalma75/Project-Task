import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.presentacion}>
          <h4>Presentación</h4>
          <p>
            Soy Emilce Rocio Palma, estudiante de Ingeniería en Sistemas apasionada por el desarrollo web, APIs y pruebas. Actualmente, en CODES SA, implemento operaciones ABM integrando Vue.js y Vuetify con .NET, utilizando Entity Framework y trabajando colaborativamente con GIT. Siempre busco aprender y contribuir con soluciones eficientes, aportando resiliencia y organización a mi equipo.
          </p>
        </div>
        <a href="/CV_Rocio-Palma.pdf" target="_blank" rel="noopener noreferrer">
          Ver mi CV
        </a>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://github.com/rociopalma75/Project-Task"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir al repositorio de Github 
          </a>
          <Link
            className={styles.primary}
            href="/tasks"
          >Ir a Tareas</Link>

        </div>
      </main>
    </div>
  );
}
