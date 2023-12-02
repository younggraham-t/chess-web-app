// import '../../../styles/styles.css'
import './NavigationLink.css'
import {Link} from "react-router-dom"

function NavigationLink({linkPath, linkName}) {
    console.log("linkPath", linkPath)
    console.log("linkName", linkName)
    return (
        <div>
        <Link to={linkPath} className="sidebar-link">{linkName}</Link>
            {/* <a href={linkPath}>{linkName}</a>  */}
        </div>
    )
}

export default NavigationLink