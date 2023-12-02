import './HomePage.css'

function HomePage() {
    return (
        <>
        <header class="header">
        <h1>Chess</h1> 
    </header>
   <main> 
        <nav class="left-panel">
            <div class="sidebar-link">
                <a href="pages/chessPage.html" id="sidebar-link-to-game">Play Game</a>
            </div>
            
            
            <div class="sidebar-link">
                <a href="pages/userPage.html" id="sidebar-link-to-scores">View Scores</a>
            </div>
        </nav>
        <div class="center-panel">
            <h2>Center Panel</h2>
        </div> 

        <aside class="right-panel">
            <h2>Right Panel</h2>
        </aside>
    </main>
    </>
    )
}

export default HomePage