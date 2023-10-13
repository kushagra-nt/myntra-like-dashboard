import { SearchIcon } from "./Icons";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    searchValue: string,
    setSearchValue: (value:string) => void,
    className?: string;
    handleSubmit: ()=>void
}

const SearchBar:React.FC<Props> = ({searchValue, setSearchValue, className, handleSubmit, ...props}: Props)=>{



    return (
        <div className={twMerge("flex leading-7 m-auto relative",className)}>
            <SearchIcon
                className="absolute hover:cursor-pointer right-4 top-2 fill-[#9e9ea7] w-8 h-8"
                onClick={handleSubmit}
            />
            <input
                placeholder="search.."
                value={searchValue}
                onChange={(e)=>{setSearchValue(e.target.value)}}
                {...props}
                className="w-full text-lg px-5 py-3 pr-14 h-[50px] leading-7 border-solid border-transparent border-2 rounded-lg outline-none bg-[#f3f3f4] color-[#0d0c22] transition ease delay-300 placeholder:color-[#9e9ea7]"
                onKeyDown={(e)=>{
                    if(e.key==='Enter'){
                        handleSubmit();
                    }
                }}
            />
        </div>
    )
};

export default SearchBar;