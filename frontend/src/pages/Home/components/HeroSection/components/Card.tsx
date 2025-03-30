import { ICard } from "../../../../../constants/types";

function Card({title , image , description , color }: ICard) {
    return (
        <div className="h-[16.7rem] w-56 bg-gradient-to-r from-[rgba(0,224,255,0.5)] to-[rgba(136,0,255,0.5)] bg-opacity-10 border-[0.1px] border-white rounded-xl shadow-2xl flex flex-col items-center justify-around mt-3">
            <h3 className="text-white text-center px-5">
                {title}
            </h3>
            {image ? <img src="image" className=""/> : (<div className="h-28 w-48 border-[0.1px] border-white rounded-xl"/>)}
            <p className="text-white text-center tracking-normal leading-5 px-3 text font- font-iceland ">
                {description}
            </p>
        </div>
    )
}

export default Card;