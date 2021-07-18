import Button from './shared/Button/Button';

const WalletButton = ({ provider, loadWeb3Modal, logoutOfWeb3Modal } : any) => {

    const determineOnClick = () => {
        if (!provider) {
            return loadWeb3Modal;
        } else {
            return logoutOfWeb3Modal;
        }
    }

    return (
        <Button onClick={() => determineOnClick()()}>
            {!provider ? "Connect Wallet" : "Disconnect Wallet"}
        </Button>
    );
}

export default WalletButton