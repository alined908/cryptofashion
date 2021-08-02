import {useState} from "react";
import StyledHeader from "../shared/Header/Header";
import { useMediaQuery } from 'react-responsive';
import StyledNavigationMobile from "./NavigationMobile";
import Footer from "../shared/Footer/Footer";
import styled from "styled-components";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(#e8f4f8,#fff);
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 80%;
    margin: 0 auto;
    height: 100%;
`

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
            <Main>
                {children}
            </Main>
            <Footer/>
            {isMobileHeaderOpen && <StyledNavigationMobile setClosed={() => setMobileHeaderOpen(false)}/>}
        </Layout>
    )
}

export default StyledLayout