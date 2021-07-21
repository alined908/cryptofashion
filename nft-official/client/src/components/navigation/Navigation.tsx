import styled from 'styled-components';
import navigationTabs from '../../constants/links';
import WrappedNavigationTab from "./NavigationTab";
import Burger from '../shared/Burger';

const Navigation = styled.div`
    display: flex;
`

interface NavigationSectionProps{
    setMobileHeaderOpen: () => void
}

const NavigationSection = ({setMobileHeaderOpen} : NavigationSectionProps) => {
    return (
        <Navigation>
            {navigationTabs.map((tab) => 
                <WrappedNavigationTab 
                    link={tab.link} 
                    name={tab.name} 
                    responsive={false}
                />
            )}
            <Burger onClick={setMobileHeaderOpen}>
                <span></span>
                <span></span>
                <span></span>
            </Burger>
        </Navigation>
    )
}

export default NavigationSection;