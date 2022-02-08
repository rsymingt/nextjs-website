import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function TextCarousell({ timeout, selections, before='', after='', className='' }: {
  timeout: number,
  selections: string[],
  before?: string,
  after?: string,
  className?: string,
}) {
  const [selected, setSelected] = useState(0);
  // const { timeout, selections } = props;

  useEffect(() => {
      setTimeout(() => {
          setSelected(selected < selections.length-1 ? selected+1 : 0)
      }, timeout)
  })

  return(
      <div className={classNames(
          className,
          'grid auto-cols-max',
      )}>
          <p className='col-start-1 row-start-1'>{before}</p>
          {selections && selections.map((selection, i) => 
              <>
                  <Transition
                  as='p'
                  className='col-start-2 row-start-1 inline-block'
                  show={i === selected}
                  enter='transition-all duration-500 ease-out'
                  enterFrom='opacity-0 translate-y-full'
                  enterTo='opacity-100'
                  leave='transition-all duration-500 ease-out'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0 -translate-y-full'
                  >
                      {selection}
                  </Transition>
                  <p className='col-start-2 row-start-1 invisible'>{selection}</p>
              </>
          )}
          <p className='col-start-3 row-start-1'>{after}</p>
      </div>
  )
}
