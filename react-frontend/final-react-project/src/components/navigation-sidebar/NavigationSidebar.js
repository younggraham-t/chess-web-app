import './NavigationSidebar.css'
import NavigationLink from './navigation-link/NavigationLink'

function NavigationSidebar({linkedPages}) {

    let pages = linkedPages.map(function(element) {
        return <NavigationLink linkPath={element.link} linkName={element.name}/>
    })
    return (
        <div className="navigation-sidebar">
        {pages}
        </div>
    )
}

export default NavigationSidebar