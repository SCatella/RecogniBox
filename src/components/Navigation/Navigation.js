import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav
                style = {
                    {
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }
                }
                onClick={() => onRouteChange('signin')}
                className = 'f3 link dim black underline pa3 pointer'> Sign Out
            </nav>
        );
    } else {
        return (
            <nav
                style = {
                    {
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }
                }>
            </nav>
        );
    }

}

export default Navigation;
