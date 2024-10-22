import { useState } from 'react';
import { PopMenuContext } from './PopMenuContext';
import { Popover, PopoverPosition } from 'react-tiny-popover';
import PopMenuAnimation from './PopMenuAnimation';
import './PopMenu.css';


const PopMenu = (props: {
  trigger: JSX.Element | string,
  content: JSX.Element | string,
  positions?: PopoverPosition[],
  align?: any,
  padding?: number,
  clickHandler?: Function,
  highlighted?: boolean,
  useTools?: boolean,
  equalWidth?: boolean,
  direction?: string,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopover = () => setIsPopoverOpen(!isPopoverOpen);

  if (props.content) {
    // USE AS POPPING ELEMENT
    return (
      <Popover
        isOpen={isPopoverOpen}
        positions={props.positions || ['bottom', 'right']} // if you'd like, you can limit the positions
        align={props.align ?? 'start'}
        padding={props.padding || 4} // adjust padding here!
        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
        content={() => ( // you can also provide a render function that injects some useful stuff!
          <PopMenuContext.Provider value={{ handlePopover }}>
            <PopMenuAnimation direction={props.direction}>
              {props.content}
            </PopMenuAnimation>
          </PopMenuContext.Provider>
        )}
      >
        <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          {props.trigger}
        </div>
      </Popover>
    );
  }
};

export default PopMenu;