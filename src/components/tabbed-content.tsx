import classNames from 'classnames';
import React, { useState } from 'react';

export default function TabbedContent({
  tabbedContent,
}: {
  tabbedContent: {
    [key: string]: Array<{
      title: string;
      short: string;
      link?: string;
      description: string;
    }>;
  };
}) {
  const [selected, setSelected] = useState(Object.keys(tabbedContent)[0]);

  function tabHandler(tabTitle: string) {
    setSelected(tabTitle);
  }

  return (
    <>
      <div className="flex flex-1 flex-wrap text-lg gap-x-8 gap-y-4">
        {tabbedContent &&
          Object.keys(tabbedContent).map((tabTitle: string, i: number) => (
            <a
              key={`tabbedContent-link-${tabTitle}-${i}`}
              className={classNames(
                'relative block whitespace-nowrap',
                'hover:cursor-pointer hover:text-vibrant-red hover:after:w-full hover:after:bg-red-700\
                        after:transition-width after:ease-out after:duration-300 after:absolute after:h-0.5 after:-bottom-0.5 after:left-0',
                selected === tabTitle
                  ? 'text-vibrant-red after:bg-vibrant-red after:w-full'
                  : 'text-white after:bg-white after:w-1/3'
              )}
              onClick={() => tabHandler(tabTitle)}
            >
              <strong>{tabTitle}</strong>
            </a>
          ))}
      </div>
      <div className="mt-4 grid grid-cols-1 ">
        {tabbedContent &&
          Object.entries(tabbedContent).map(([tabTitle, list], i) => (
            <div
              key={`tabbedContent-content-${tabTitle}-${i}`}
              className={classNames(
                'transition-opacity duration-500 ease-in col-start-1 row-start-1 space-y-3',
                selected === tabTitle ? 'opacity-100' : 'opacity-0 invisible'
              )}
            >
              {list &&
                list.map(({ title, short, link, description }, z) => (
                  <p
                    key={`tabbedContent-content-p-${tabTitle}-${i}-${z}`}
                    className="text-base"
                  >
                    <strong className="font-bold">{title}</strong> -{' '}
                    {link ? (
                      <a
                        className="hover:text-white"
                        rel="noreferrer"
                        target="_blank"
                        href={link}
                      >
                        {short}
                      </a>
                    ) : (
                      short
                    )}
                    <br />
                    {description}
                  </p>
                ))}
            </div>
          ))}
      </div>
    </>
  );
}
