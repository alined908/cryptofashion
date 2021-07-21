import StyledLayout from '../navigation/Layout';

const CustomPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}

    return (
        <StyledLayout {...web3Props}>
            Custom Page
        </StyledLayout>
    )
}

export default CustomPage