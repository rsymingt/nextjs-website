import classNames from 'classnames'
import React, { forwardRef } from 'react'

interface Section {
  children: React.ReactNode
  id: string
  className?: string
}

function Section(
  { children, id, className }: Section,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <section
      ref={ref}
      id={id}
      className={classNames('section pt-16 pb-8', className)}
    >
      {children}
    </section>
  )
}

export default forwardRef<HTMLElement, Section>(Section)
