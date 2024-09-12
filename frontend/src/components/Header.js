import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { signOutUser } from "../redux-config/UserSlice";
import { useState } from "react";

export default function Header() {
    let {categoryList} = useSelector((store)=>store.Categories);
    let {isLoggedIn} = useSelector((store)=>store.User);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const signOut = ()=>{
        dispatch(signOutUser());
    };
        const handleSearchChange = (event)=>{
            setSearchQuery(event.target.value);
        };
        const handleSearchSubmit = (event)=>{
            event.preventDefault();
            console.log("search for:",searchQuery);
        };
    
    return <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#"><b>E-</b><small className="text-danger">Shop</small></a>
             <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/product">Products</Link>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Categories
                    </a>
                    <div className="dropdown-menu">
                        {categoryList?.map((category,index)=><a key={index} className="dropdown-item" href="#">{category.name}</a>)}
                    </div>    
                </li>
                <li className="nav-item">
                    <form className="form-inline" onSubmit={handleSearchChange}>
                        <input
                            className="form-control mr-sm-2" type="search"placeholder="Search"aria-label="Search" value={searchQuery}onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0"type="submit">Search</button>
                    </form>
                </li>
                
                <li className="nav-item">
                   {isLoggedIn ? "":<Link className="nav-link" to="/sign-in">Sign In</Link>} 
                </li>
                <li className="nav-item">
                    {isLoggedIn? "":<Link className="nav-link" to="/sign-up">Sign Up</Link>}
                </li>
                <li className="nav-item">
                    {isLoggedIn? <Link className="nav-link" to="/view-cart">View cart</Link>:""}
                </li>
                <li className="nav-item">
                    {isLoggedIn? <Link className="nav-link" onClick={signOut}>Sign out</Link>:""}
                </li>
            </ul>
        </nav>
    </>
}