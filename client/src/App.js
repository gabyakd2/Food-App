import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/createRecipe' component={RecipeCreate} />
        <Route exact path='/recipe/:id' render={({ match }) => <Detail id={match.params.id} />} />
      </div>
    </BrowserRouter>
    );
}

export default App;
