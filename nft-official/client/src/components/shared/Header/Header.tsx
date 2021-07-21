import styled from 'styled-components';
import {Link} from 'react-router-dom';
import NavigationSection from '../../navigation/Navigation';
import WalletButton from '../../WalletButton';

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 1rem;
    border-bottom: var(--border);
    background: transparent;
`

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`

interface HeaderProps {
    isResponsive: boolean
    setMobileHeaderOpen: () => void
    provider: any
    loadWeb3Modal: any
    logoutOfWeb3Modal: any
}

const StyledHeader = ({isResponsive, setMobileHeaderOpen, provider, loadWeb3Modal, logoutOfWeb3Modal} : HeaderProps) => {
    return (
        <Header>
            <LogoSection>
                <Link to="/">NFTProject</Link>
            </LogoSection>
            <NavigationSection setMobileHeaderOpen={setMobileHeaderOpen}/>
            <WalletButton 
                provider={provider} 
                loadWeb3Modal={loadWeb3Modal} 
                logoutOfWeb3Modal={logoutOfWeb3Modal} 
            />
        </Header>
    )
}

export default StyledHeader