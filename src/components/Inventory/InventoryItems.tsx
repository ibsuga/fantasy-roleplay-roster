import InventoryItem from '../InventoryItem/InventoryItem';
import useItemStore from '../../store/InventoryStore';
import CreateItemButton from './CreateItemButton';
import { useState } from "react";
import { GiChestArmor, GiCrocSword, GiPotionBall, GiHandBag } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { Dialog } from 'primereact/dialog';

import { ColorPicker } from 'primereact/colorpicker';


export const InventoryItems = () => {
    //Filter states.
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [containerFilter, setContainerFilter] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    //Sort state
    const [sortMode, setSortMode] = useState<string | null>('new');

    //Container states.
    const [containerLabel, setContainerLabel] = useState('');
    const [containerColor, setContainerColor] = useState('');

    const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);

    const items = useItemStore((state) => state.items);
    const containers = useItemStore((state) => state.containers);
    const addContainer = useItemStore((state) => state.addContainer);
    const deleteContainer = useItemStore((state) => state.deleteContainer);

    const selectedContainer: any = containers.find(container => container.id === containerFilter);

    // Filter Items by category or containers.
    let filtered_items;

    if (categoryFilter !== null) {
        filtered_items = items.filter((item: any) => item.category === categoryFilter);
    } else if (containerFilter !== null) {
        filtered_items = items.filter((item: any) => item.container_id == containerFilter);
    } else {
        filtered_items = [...items];
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

    let sorted_items;

    switch (sortMode) {
        case 'a-z':
            sorted_items = filtered_items.sort((a, b) => a.name < b.name ? -1 : 1)
            break;
        case 'z-a':
            sorted_items = filtered_items.sort((a, b) => a.name > b.name ? -1 : 1)
            break;
        case 'new':
            sorted_items = filtered_items.sort((a, b) => b.id - a.id)
            break;
        case 'old':
            sorted_items = filtered_items.sort((a, b) => a.id - b.id)
            break;
        default:
            sorted_items = filtered_items
            break;
    }

    //Create Container Dialog.
    const handleClose = () => {
        setInventoryDialogOpen(false);
        setContainerLabel('');
        setContainerColor('');
    }

    const handleCreateContainer = () => {
        if (containerLabel !== '') {
            addContainer(containerLabel, containerColor)
            handleClose()
        }
    }

    //Container delete function.
    const handleDeleteContainer = () => {
        deleteContainer(selectedContainer?.id)
        setCategoryFilter(null);
        setContainerFilter(null);
    }

    // Active filter label content.
    let active_filter_content;

    if (categoryFilter !== null) {
        active_filter_content = categoryFilter;
    } else if (containerFilter !== null) {
        active_filter_content = selectedContainer?.label;
    } else {
        active_filter_content = 'All Items';
    }


    return (
        <>
            <div className='filter-bar'>
                <span>  <MdClear onClick={() => {
                    setCategoryFilter(null)
                    setContainerFilter(null);
                }} /> </span>
                <span className='spacer'> <LuDot /> </span>
                <span> <GiCrocSword onClick={() => {
                    setCategoryFilter('weapon')
                    setContainerFilter(null);
                }} /> </span>
                <span> <GiChestArmor onClick={() => {
                    setCategoryFilter('armor')
                    setContainerFilter(null);
                }} /> </span>
                <span> <GiPotionBall onClick={() => {
                    setCategoryFilter('items')
                    setContainerFilter(null);
                }} /> </span>
                <span className='spacer'> <LuDot /> </span>

                <div className='containers'>
                    {
                        containers.map((container, index) =>
                            <GiHandBag
                                key={index}
                                onClick={() => {
                                    setCategoryFilter(null);
                                    setContainerFilter(container.id)
                                }}
                                style={{ color: `#${container.color}` }}
                            />

                        )
                    }
                    <button onClick={() => setInventoryDialogOpen(true)}>+</button>
                </div>

                <Dialog
                    className={'inventoryDialog'}
                    header={'New Container'}
                    visible={inventoryDialogOpen}
                    onHide={handleClose}
                    footer={
                        <div className="dialog-footer">
                            <button className='footer-button' onClick={handleCreateContainer} disabled={!containerLabel}> Save </button>
                            <button className='footer-button' onClick={handleClose}> Close </button>
                        </div>
                    }
                    closable={false}
                    draggable={false}
                    resizable={false}
                >
                    <div>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder='Container Name' value={containerLabel} onChange={(e) => { setContainerLabel(e.target.value) }} />
                            <ColorPicker format='hex' value={containerColor} onChange={(e: any) => { setContainerColor(e.value) }} />
                        </div>
                    </div>
                </Dialog>
            </div>



            <div className="tools-bar">

                <div className="tools-bar-top">

                    <div className='active-filter'>{active_filter_content}</div>

                    <div className='inventory-search-bar'>
                        <FaSearch />
                        <input onChange={handleChangeSearchtext} value={searchText} type="text" placeholder='Find items...' />
                    </div>

                </div>

                <div className="tools-bar-bottom">

                    <div className="sort-buttons">

                        <button
                            onClick={() => setSortMode(sortMode === 'a-z' ? 'z-a' : 'a-z')}
                            className={(sortMode === 'a-z' || sortMode === 'z-a') ? 'active' : ''}
                        >
                            {sortMode === 'z-a' ? 'Z-A' : 'A-Z'}
                        </button>

                        <button
                            onClick={() => setSortMode(sortMode === 'new' ? 'old' : 'new')}
                            className={(sortMode === 'new' || sortMode === 'old') ? 'active' : ''}
                        >
                            {sortMode === 'old' ? 'OLD' : 'NEW'}
                        </button>

                    </div>


                    <button
                        className='delete-container-button'
                        onClick={() => handleDeleteContainer()}
                        disabled={!containerFilter}
                    >DELETE CONTAINER</button>

                    <CreateItemButton />
                </div>



            </div>





            <div className='items'>
                <div>
                    {
                        sorted_items.map((item: any, index: number) =>
                            <InventoryItem
                                key={index}
                                id={item.id}
                                name={item.name}
                                encumbrance={item.encumbrance}
                                damage={item.damage}
                                range={item.range}
                                category={item.category}
                                subCategory={item.subCategory}
                                availability={item.availability}
                                qualities={item.qualities}
                                flaws={item.flaws}
                                description={item.description}
                                locations={item.locations}
                                carry={item.carry}
                                amount={item.amount}
                                isRanged={item.isRanged}
                                armourPoints={item.armourPoints}
                                container_id={item.container_id}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default InventoryItems;


