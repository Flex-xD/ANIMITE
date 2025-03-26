import { Button } from '../../components/ui/button';
import backgroundImage from "../../../src/images/DALL·E 2025-02-26 16.59.11 - A futuristic anime-style background featuring a neon-lit cyberpunk cityscape. The scene includes towering skyscrapers with holographic billboards, fly.webp"
import { IAuthButton } from '../../constants/types';

const Home = () => {
  const tabs = ["Home", "Anime", "Community"];
  const buttons = ["LOGIN" , "LOGOUT"];

  const AuthButton = ({buttonName} :IAuthButton) => {
    return (
      <Button className='h-[5.5vh] w-max-24 rounded-3xl bg-gradient-to-b from-[#6A00FF] to-[#FF00FF] font-exo font-bold text-[#FFFFFF] text-xs opacity-85'>
        <span>
          {buttonName}
        </span>
      </Button>
    )
  }

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
          <AuthButton buttonName='Profile'>
          </AuthButton>
        </div>

        <div className="h-[10vh] w-[25vw] flex items-center justify-evenly">
          {tabs.map((tab) => (
            <span className="text-lg font-raleway font-semibold text-[#B8CFFF] cursor-pointer">{tab}</span>
          ))}
        </div>

        <div className="w-[14vw] h-[10vh] flex items-center justify-around ">
          {buttons.map((button) => (
            <AuthButton buttonName={`${button}`}>{button}</AuthButton>
          ))}

        </div>

      </div>
      
    </div>
  );
};

export default Home;