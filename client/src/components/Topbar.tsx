import Img1 from "../assets/Google-Docs-logo.png";
import Img2 from "../assets/SearchIcon.jpeg";
import { useState, useRef } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';
import { clearUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from '../hooks/useClickOutside.hook';
import { UserDetails } from "../typings/auth.types";
import { useDebounce } from '../hooks/useDebounce.hook';

interface TopbarProps {
    user: UserDetails;
    onSearch: (query: string) => void;
}

export const Topbar = ({ user, onSearch }: TopbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    const [searchValue, setSearchValue] = useState('');

    const debouncedSearch = useDebounce((value: string) => {
        onSearch(value);
    }, 500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearch(value);
    };

    return (
        <nav className="Topbar">
            <div className="logodiv">
                <img src={Img1} alt="Logo" />
                <span> Docs </span>
            </div>
            <div className="Searchbar">
                <img src={Img2} alt="" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchValue}
                    onChange={handleSearchChange} 
                />
            </div>
            <div className="profile-div" ref={dropdownRef}>
                <button
                    className="profile-button"
                    aria-label="Google Account"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {user?.avatar ? (
                        <img
                            src={user?.avatar}
                            alt={`${user?.name}'s profile`}
                            className="profile-avatar"
                        />
                    ) : (
                        <div className="avatar-placeholder">
                            {user?.name.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                </button>
                {isDropdownOpen && (
                    <div className="profile-dropdown">
                        <div className="dropdown-header">
                            <div className="user-avatar">
                                {user?.avatar ? (
                                    <img src={user?.avatar} alt={`${user?.name}'s profile`} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {user?.name.slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="user-info">
                                <p className="user-name">{user?.name}</p>
                                <p className="user-email">{user?.email}</p>
                            </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button className="logout-button" onClick={handleLogout}>
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}