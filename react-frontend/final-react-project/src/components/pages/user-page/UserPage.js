import './UserPage.css'

import CenterPanel from '../../center-panel/CenterPanel'
import NavigationSidebar from '../../navigation-sidebar/NavigationSidebar'

function UserPage() {
    const navigationLinks = [
        {name: 'Home Page', link: "/"},
        {name: 'Chess Page', link: "/chess"}
    ]
    return (
        <>
            <header> 
                <h1>User Page </h1>
            </header> 
            <main>
                    <NavigationSidebar linkedPages={navigationLinks}/>
                    <CenterPanel/>
            </main> 
        </>
    ) 
}

export default UserPage