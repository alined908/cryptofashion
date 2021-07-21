import StyledLayout from '../navigation/Layout';

const HomePage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}

    return (
        <StyledLayout {...web3Props}>
            Hello. Home Page
        </StyledLayout>
    )
}

export default HomePage