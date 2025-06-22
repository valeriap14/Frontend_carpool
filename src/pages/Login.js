import '../styles/Login.css';

function Login() {
  return (
    <main className="registro-container">
      <form className="registro-form">
        <div className="registro-header">
          <h1>Bienvenido a Loop</h1>
          <p>
            Inicia Sesion para empezar tu 
            Experiencia 
          </p>
        </div>

        <div className="registro-campos">
          <div className="campo">
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              placeholder="Kelin Andrea Diaz Sanchez"
            />
          </div>

          <div className="campo">
            <label htmlFor="email">Correo Institucional:</label>
            <input
              type="email"
              id="email"
              placeholder="kasanchez@unah.hn"
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              placeholder="*************"
            />
          </div>
        </div>
        <div className="registro-botones">
          <button type="submit">Continuar</button>
          <button type="button" className="cancelar">Cancelar</button>
        </div>
      </form>
    </main>
  );
}

export default Login;