import React, { useContext, useEffect } from 'react'
import AuthService from '../services/jwtInterceptor'
import MenuSidebar from './MenuSidebar'
import MainBody from './MainBody'
import AuthContext from './AuthContext'

function Dashboard() {
    
    return(
        <div className="antialiased bg-slate-800 w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <MenuSidebar />
                <MainBody />
            </div>
        </div>
    )
}
export default Dashboard;