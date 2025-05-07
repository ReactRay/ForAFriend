import { Outlet } from "react-router-dom"


function Layout() {
    return (
        <div className="layout">

            <div className="first">
                <h1>Where talent and ambitions meet to acheive great things.</h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nisi cumque illum suscipit odit consequuntur distinctio facere. Quidem, voluptatum reprehenderit repellendus dicta mollitia ut suscipit eveniet tempora ab blanditiis repudiandae?</p>
            </div>

            <div className="second">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
