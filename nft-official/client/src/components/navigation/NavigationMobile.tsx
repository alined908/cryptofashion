import styled from 'styled-components';
import NavigationClose from './NavigationClose';
import NavigationLinks from './NavigationLinks';
import WrappedNavigationTab from './NavigationTab';
import navigationTabs from '../../constants/links';

interface NavigationMobileProps {
    setClosed: () => void
}

const NavigationMobile = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: black;
    z-index: 5;
    padding: 2rem;
`

const StyledNavigationMobile = ({setClosed} : NavigationMobileProps) => {
    return (
        <NavigationMobile>
            <NavigationClose onClick={setClosed}/>
            <NavigationLinks>
                {navigationTabs.map((tab) => 
                    <WrappedNavigationTab 
                        link={tab.link} 
                        name={tab.name} 
                        responsive={true} 
                        setClosed={setClosed}
                    />
                )}
            </NavigationLinks>
        </NavigationMobile>
    )
}

export default StyledNavigationMobile