import { Route, Switch } from 'react-router-dom'
import NFTPage from '../pages/NFTPage';
import HomePage from '../pages/HomePage';
import CustomPage from '../pages/CustomPage';

const Routes = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider: provider, loadWeb3Modal: loadWeb3Modal, logoutOfWeb3Modal: logoutOfWeb3Modal}

    return (
        <Switch>
            <Route exact path="/" render={(props) => <HomePage {...props} {...web3Props}/>}/>
            <Route path="/nfts" render={(props) => <NFTPage {...props} {...web3Props}/>}/>
            <Route path="/custom" render={(props) => <CustomPage {...props} {...web3Props}/>}/>
        </Switch>
    )
}

export default Routes