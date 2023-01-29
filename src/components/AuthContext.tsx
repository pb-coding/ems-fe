import jwtInterceptor from '../services/jwtInterceptor'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(() => {	
        let userProfile = localStorage.getItem('userToken')
        if (userProfile) {
            return JSON.parse(userProfile)
        }
        return null;
    })

    const navigate = useNavigate()
    const login = async (payload: any) => {
        
        let loginEndpointResponse = await jwtInterceptor.post("/api/login", payload)
        console.log(loginEndpointResponse.data)

        localStorage.setItem('userToken', JSON.stringify(loginEndpointResponse.data))
        
        let userEndpointResponse = await jwtInterceptor.get("/api/user/" + payload.username, { 
            headers: {
                'Authorization': 'Bearer ' + loginEndpointResponse.data.access_token,
            }
        })
        setUser(userEndpointResponse.data)

        navigate("/")
    }

    const logout = async () => {
        localStorage.removeItem('userToken')
        setUser(null)
        navigate("/login")
    }

    return (
        <>
            <AuthContext.Provider value={{ user, setUser, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    )

}
export default AuthContext;