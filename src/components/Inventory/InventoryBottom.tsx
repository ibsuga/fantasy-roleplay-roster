import useItemStore from "../../store/InventoryStore";
import PopMenu from '../PopMenu/PopMenu';
import { useMemo } from "react";
import { GiTwoCoins, GiSwapBag } from 'react-icons/gi';
import { FaWeightHanging } from "react-icons/fa";
import { TbInfoHexagon } from "react-icons/tb";


const InventoryBottom = () => {
  const [items, encumbrance, updateMaxEncumbrance, wealth, updateWealth] = useItemStore((state) => [
    state.items,
    state.encumbrance,
    state.updateMaxEncumbrance,
    state.wealth,
    state.updateWealth
  ]);

  //Encumbrance filters by category
  const weaponItems = useMemo(() => items.filter((item) => item.category === 'weapon'), [items]);
  const armorItems = useMemo(() => items.filter((item) => item.category === 'armor'), [items]);
  const consumableItems = useMemo(() => items.filter((item) => item.category === 'items'), [items]);

  const weaponEncumbrance = useMemo(() => weaponItems.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
  const armorEncumbrance = useMemo(() => armorItems.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
  const consumableEncumbrance = useMemo(() => consumableItems.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
  const totalEncumbrance = useMemo(() => items.reduce((prev: number, item: any) => prev + (item.encumbrance * item.amount), 0), [items]);


  const EncumbranceInfoTooltipContent =
    <div className="encumbrance-info-tooltip">
      <span className="header">Encumbrance by Category</span>
      <span className="header-background">Encumbrance</span>
      <hr />
      <div>
        <span className="label">Weapons: </span>
        <span className="encumbrance-value">{weaponEncumbrance}</span>
      </div>
      <div>
        <span className="label">Armor: </span>
        <span className="encumbrance-value">{armorEncumbrance}</span>
      </div>
      <div>
        <span className="label">Items: </span>
        <span className="encumbrance-value">{consumableEncumbrance}</span>
      </div>
    </div>;


  const EncumbranceRulesTooltipContent =
    <div className="encumbrance-rules-tooltip">
      <div className="header">ENCUMBRANCE RULES</div>
      <span className="header-background">Rules</span>
      <hr />
      <table>
        <tbody>
          <tr>
            <th>Encumbrance</th>
            <th>Penalty</th>
          </tr>
          <tr>
            <td>Up to limit</td>
            <td>No penalties.</td>
          </tr>
          <tr>
            <td>2x limit</td>
            <td>-1 Movement (min:3), -10 Agi , +1 Travel Fatigue.</td>
          </tr>
          <tr>
            <td>3x limit</td>
            <td>-2 Movement (min:2), -20 Agi (min:10), +1 Travel Fatigue.</td>
          </tr>
          <tr>
            <td>More than 3x</td>
            <td>You're not moving.</td>
          </tr>
        </tbody>
      </table>
    </div>;


  const WealthConversionTooltipContent =
    <div className="conversion-tooltip">
      <div className="header">COIN CONVERSION</div>
      <div className="header-background">Conversion</div>
      <hr />
      <div className="content">
        <span>Standard coin values are:</span>
        <span> <GiTwoCoins className="gold" /> 1 gold crown (1GC) = <GiTwoCoins className="silver" /> 20 silver shillings (20/–) </span>
        <span><GiTwoCoins className="silver" /> 1 silver shilling (1/–) = <GiTwoCoins className="copper" /> 12 brass pennies (12d)</span>
      </div>
    </div>;


  return (
    <div className='inventory-bottom'>

      <div className='encumbrance'>
        <PopMenu
          trigger={<FaWeightHanging className="rules-icon" />}
          content={EncumbranceRulesTooltipContent}
          positions={['top']}
          direction="top"
        />
        <div className='encumbrance-section'>
          <span className='label'>Encumbrance</span>
          <span className={(totalEncumbrance > encumbrance) ? "encumbered" : 'not-encumbered'} >{totalEncumbrance}</span>
          <span className='label'>Max.</span>
          <input
            type="text"
            maxLength={3}
            value={encumbrance}
            onChange={(e) => updateMaxEncumbrance(Number(e.target.value) || 0)}
          />
          <PopMenu
            trigger={<TbInfoHexagon className="info-button" />}
            content={EncumbranceInfoTooltipContent}
            positions={['top']}
            align='end'
            direction="top"
          />
        </div>
      </div>

      <div className='wealth'>
        <PopMenu
          trigger={<GiSwapBag className="conversion-icon" />}
          content={WealthConversionTooltipContent}
          positions={['top']}
          direction="top"
        />
        <div className="coin-section">
          <div className="copper">
            <GiTwoCoins />
            <input type="text" value={wealth.copper} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'copper')} />
          </div>
          <div className="silver">
            <GiTwoCoins />
            <input type="text" value={wealth.silver} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'silver')} />
          </div>
          <div className="gold">
            <GiTwoCoins />
            <input type="text" value={wealth.gold} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'gold')} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default InventoryBottom;