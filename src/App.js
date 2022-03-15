import './App.css';
import Goban from './components/Goban';


function App() {

    const queryParams = new URLSearchParams(window.location.search);
    const size = queryParams.get('size') || 19;

    return (
        <div className="App">
            <Goban size={size} />
        </div>
    );
};

export default App;
