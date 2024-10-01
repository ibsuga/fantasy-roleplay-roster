import InventoryItem from '../InventoryItem/InventoryItem';
import useItemStore from '../../store/InventoryStore';
import CreateItemButton from './CreateItemButton';
import { useState } from "react";
import { GiChestArmor, GiCrocSword, GiPocketBow, GiPotionBall } from "react-icons/gi";


export const InventoryItems = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchText, setSearchText] = useState('');
    const items = useItemStore((state) => state.items);

    // Filter Items by category.
    let filtered_items;
    if (categoryFilter === '') {
        filtered_items = [...items]
    } else {
        filtered_items = items.filter((item: any) => item.category === categoryFilter);
    }

    // Further filter items by SearchBar string.
    const handleChangeSearchtext = (event: any) => {
        setSearchText(event.target.value);
    }

    if (searchText) {
        filtered_items = filtered_items.filter((item: any) => {
            const item_name = item.name.toLowerCase();
            const search_string = searchText.toLowerCase();
            return item_name.includes(search_string);
        })
    }

    return (
        <>
            <div className='filter-bar'>
                <span onClick={() => setCategoryFilter('')}> X </span>
                <span> · </span>
                <span> <GiCrocSword onClick={() => setCategoryFilter('melee')} /> </span>
                <span> <GiPocketBow onClick={() => setCategoryFilter('ranged')} /></span>
                <span> <GiChestArmor onClick={() => setCategoryFilter('armor')} /></span>
                <span> <GiPotionBall onClick={() => setCategoryFilter('consumable')} /></span>
            </div>
            <div className="tools-bar">
                <input onChange={handleChangeSearchtext} value={searchText} type="text" placeholder='Find items...' />
                <CreateItemButton />
            </div>
            <div className='items'>
                {
                    filtered_items.map((item: any, index: number) =>
                        <InventoryItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            encumbrance={item.encumbrance}
                            damage={item.damage}
                            range={item.range}
                            category={item.category}
                            availability={item.availability}
                            qualities={item.qualities}
                            flaws={item.flaws}
                        />
                    )
                }
            </div>
        </>
    )
}

export default InventoryItems;


