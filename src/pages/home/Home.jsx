import AdminOnly from '../../components/adminPanel/AdminOnly';
import Slider from '../../components/slider/Slider';
import './Home.scss';

const Home = () => {
  return (
    <div>
      {/* <Slider /> */}
      <h1>Home</h1>
      <AdminOnly />
    </div>
  );
};

export default Home;
