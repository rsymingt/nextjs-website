import React, { forwardRef } from 'react';

import styles from './Section.module.css';
import { twMerge } from 'tw-merge';

interface Section {
  children: React.ReactNode;
  className?: string;
}

function Section(
  { children, className }: Section,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <section
      ref={ref}
      className={twMerge(`${styles['section']} ${className ?? ''}`)}
    >
      {/* <section ref={ref} className={classNames(`section pt-16 pb-8`, className)}> */}
      {children}
    </section>
  );
}

export default forwardRef<HTMLElement, Section>(Section);
