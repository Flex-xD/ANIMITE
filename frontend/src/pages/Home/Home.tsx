import { Button } from '../../components/ui/button';
import backgroundImage from "../../../src/images/DALL·E 2025-02-26 16.59.11 - A futuristic anime-style background featuring a neon-lit cyberpunk cityscape. The scene includes towering skyscrapers with holographic billboards, fly.webp"

const Home = () => {
  const tabs = ["Home", "Anime", "Community"];
  const buttons = ["LOGIN" , "LOGOUT"];
  return (
    <div
      className="m-0 p-0 w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 31, 0.8) 60%, rgba(168, 48, 219, 0.8) 100%), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-[12vh] w-[100vw] flex items-center justify-evenly">
        <div className="w-[10vw]">
          <Button className="bg-white">
            Profile
          </Button>
        </div>

        <div className="h-[10vh] w-[25vw] flex items-center justify-evenly">
          {tabs.map((tab) => (
            <span className="text-lg font-raleway font-semibold text-[#B8CFFF]">{tab}</span>
          ))}
        </div>

        <div className="w-[14vw] h-[10vh] flex items-center justify-around ">
          {buttons.map((button) => (
            <Button className="bg-white">{button}</Button>
          ))}
        </div>

      </div>
      
    </div>
  );
};

export default Home;