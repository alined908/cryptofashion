import StyledLayout from '../navigation/Layout';

const CollectionPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}

    return (
        <StyledLayout {...web3Props}>
            Hello. Collections Page
        </StyledLayout>
    )
}

export default CollectionPage