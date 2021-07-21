import styled from 'styled-components';
import {Link} from 'react-router-dom';

interface NavigationTabProps {
    link: string
    name: string
    responsive: boolean
    setClosed?: () => void
}

const NavigationTab = styled.div`
    cursor: pointer;
    padding: .5rem;
    margin: 0 1rem;
    font-weight: bold;
    font-size: 1.15rem;
    transition: all .25s ease;

    &:hover {
        color: var(--hover-color);
    }

    @media (max-width: 768px) {
        display: none;
    }
`

const WrappedNavigationTab = ({link, name, responsive, setClosed} : NavigationTabProps) => {
    return (
        <Link to={link}>
            <NavigationTab onClick={setClosed}>{name}</NavigationTab>
        </Link>
    )
}

export default WrappedNavigationTab