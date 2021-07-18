import {useState} from "react";
import WalletButton from "../../components/WalletButton";
import { useMediaQuery } from 'react-responsive'
import {Link} from 'react-router-dom';
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import styled from "styled-components";

export const navigationTabs = [
    {link: '/nfts', name: 'NFTs'}
]

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

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

const NavigationClose = styled.div`
    position: absolute;
    right: 20px;
    top: 25px;
    width: 32px;
    height: 32px;
    cursor: pointer;

    &:hover::before, &:hover::after {
        background-color: var(--hover-color);
    }

    &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 4px;
        background-color: white;
    }

    &:before {
        transform: rotate(45deg);
    }

    &:after {
        transform: rotate(-45deg);
    }
`

interface NavigationMobileProps {
    setClosed: () => void
}

const NavigationLinks = styled.div`
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
    margin-top: 2rem;

    div {
        cursor: pointer;
        margin-bottom: 1rem;
        transition: all .25s ease;

        &:hover {
            color: var(--hover-color);
        }
    }
`

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

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`

const Navigation = styled.div`
    display: flex;
`

const Burger = styled.div`
    display: none;
    cursor: pointer;

    span {
        display: block;
        width: 30px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        background: black;
        border-radius: 10px;
        z-index: 1;
    }
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
                <Link to="/">Logo</Link>
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

interface LayoutProps {
    children? : any
    provider: any
    loadWeb3Modal: any
    logoutOfWeb3Modal: any
}

const StyledLayout = ({children, provider, loadWeb3Modal, logoutOfWeb3Modal} : LayoutProps) => {
    const isResponsive = useMediaQuery({ query: '(max-width: 700px)' })
    const [isMobileHeaderOpen, setMobileHeaderOpen] = useState(false);

    return (
        <Layout>
            <StyledHeader 
                provider={provider}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                isResponsive={isResponsive} 
                setMobileHeaderOpen={() => setMobileHeaderOpen(!isMobileHeaderOpen)}
            />
            {children}
            <Footer/>
            {isMobileHeaderOpen && <StyledNavigationMobile setClosed={() => setMobileHeaderOpen(false)}/>}
        </Layout>
    )
}

export default StyledLayout