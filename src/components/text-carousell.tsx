import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

export default function TextCarousell({
  timeout,
  selections,
  before = '',
  after = '',
  className = '',
}: {
  timeout: number
  selections: string[]
  before?: string
  after?: string
  className?: string
}) {
  const [selected, setSelected] = useState(0)
  // const { timeout, selections } = props;

  useEffect(() => {
    setTimeout(() => {
      setSelected(selected < selections.length - 1 ? selected + 1 : 0)
    }, timeout)
  })

  return (
    <div className={classNames('grid auto-cols-max')}>
      <p className={classNames('col-start-1 row-start-1', className)}>
        {before}
      </p>
      {selections &&
        selections.map((selection, i) => (
          <span
            key={`transition-${selection}-${i}`}
            className="grid grid-cols-1 col-start-2 row-start-1"
          >
            <Transition
              as="p"
              className={classNames(
                'col-start-1 row-start-1 inline-block',
                className
              )}
              show={i === selected}
              enter="transition-all duration-500 ease-out"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100"
              leave="transition-all duration-500 ease-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 -translate-y-full"
            >
              {selection}
            </Transition>
            <p
              className={classNames(
                'col-start-1 row-start-1 invisible',
                className
              )}
            >
              {selection}
            </p>
          </span>
        ))}
      <p className="col-start-3 row-start-1">{after}</p>
    </div>
  )
}
