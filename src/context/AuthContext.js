import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
        const [usuario, setUsuario] = useState(null);

        
        useEffect(()=> {

            const datos = localStorage.getItem('usuarioData');
            if(datos){
                setUsuario(JSON.parse(datos));
            }
        },[]);


        
        const inicioDatos = (datosUsuario) => {
            setUsuario(datosUsuario);
            localStorage.setItem('usuarioData', JSON.stringify(datosUsuario));
        };

        const finDatos = () =>{
            setUsuario(null);
            localStorage.removeItem('usuarioData');
        };

   

    
    return (<AuthContext.Provider value={{usuario, inicioDatos, finDatos}}>
    
            {children}
    </AuthContext.Provider>
    );


 };