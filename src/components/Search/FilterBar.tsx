import { SetURLSearchParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion";

type Props = {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}

const filters = [
    {
        title: 'Brands',
        filterId: 'brands',
        options: [
            {
                label: 'Mango',
                value: 'Mango'
            },
            {
                label: 'H&M',
                value: 'H&M'
            },
        ],
    },
    {
        title: 'Price Range',
        filterId: 'priceRange',
        options: [
            {
                label: 'Under 500',
                value: '0-500'
            },
            {
                label: '1000 To 3000',
                value: '1000-3000'
            },
        ],
    },
    {
        title: 'Ratings',
        filterId: 'rating',
        options: [
            {
                label: '⭐ ⭐ ⭐ ⭐ ⭐',
                value: '5'
            },
            {
                label: '⭐ ⭐ ⭐ ⭐',
                value: '4'
            },
            {
                label: '⭐ ⭐ ⭐',
                value: '3'
            },
            {
                label: '⭐ ⭐',
                value: '2'
            },
            {
                label: '⭐',
                value: '1'
            },
        ],
    },
]

const FilterBar = ({searchParams, setSearchParams}: Props) => {

    const handleChange = (filterTitle:string,e: React.ChangeEvent<HTMLInputElement>)=>{

        if(e.target.checked){
            const prevFilterValue = searchParams.get(filterTitle);
            let newFilterValue = '';
            if(prevFilterValue)newFilterValue = `${prevFilterValue},${e.target.value}`;
            else newFilterValue = e.target.value;

            setSearchParams(prev => {
                prev.set(filterTitle, newFilterValue);
                return prev;
            })
        }
        else{
            const prevFilterStringValue = searchParams.get(filterTitle);
            let filterValue = prevFilterStringValue? prevFilterStringValue.split(',') : [];
            filterValue = filterValue.filter(value => value!=e.target.value);
            setSearchParams(prev => {
                prev.set(filterTitle, filterValue.join(','));
                return prev;
            })
        }
    }

    return (
        <div className="mx-10">
            <h2 className="font-semibold text-3xl mb-10">Search Results</h2>
            
            {filters.map((filter) => {
                const filterUrlValue = searchParams.get(filter.filterId);
                const checkedOptions = filterUrlValue? filterUrlValue.split(','):[];

                return (
                <div key={filter.title}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value={"item-1"}>
                            <AccordionTrigger>
                                <h4 className="">{filter.title}</h4>
                            </AccordionTrigger>
                            <AccordionContent>
                                {filter.options.map(option => {
                                    const isOptionChecked = checkedOptions.includes(option.value);
                                    return(<div className="flex gap-2 my-2">
                                        <input
                                            key={option.label}
                                            value={option.value}
                                            type="checkbox" 
                                            className="w-4 h-4 text-blue-300 bg-gray-100 border-gray-300 rounded focus:ring-slate-300 focus:ring-2"
                                            onChange={(e)=>{handleChange(filter.filterId,e)}}
                                            checked={isOptionChecked}
                                        />
                                        <p>{option.label}</p>
                                    </div>)
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                )
            })}

        </div>
    )
}

export default FilterBar