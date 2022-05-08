import WeatherContainer from './components/WeatherContainer';
import UnitProvider from './context/UnitContext';


function App() {
  return (
    <div className="App">
      <UnitProvider>
        <WeatherContainer />
      </UnitProvider>

    </div>
  );
}

export default App;
