import React from 'react';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import './Snippet.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function PaginationComponentSnippet() {
    const jsxCodeString = `import React from "react";
import { useState, useEffect, useRef, forwardRef } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { LeftArrowIcon } from './left-arrow.jsx';
import { RightArrowIcon } from './right-arrow.jsx';

const PaginationComponent = forwardRef(({ pageNumber, setPageNumber, mainURL, totalPages, fetchMoviesOrTVShows }, ref) => {
    const [isPageNumberContainerClicked, setIsPageNumberContainerClicked] = useState(false);
    const isLoaded = useRef(false);

    function restrictInput(event) {
        if (
            (event.keyCode > 47 && event.keyCode < 59) ||
            event.key === 'Backspace' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight'
        ) {
            // do nothing
        } else {
            event.preventDefault();
        }
    };

    useEffect(() => {
        if (isLoaded.current === true) {
            fetchMoviesOrTVShows(mainURL, pageNumber);
            window.scrollTo(0, 0);
            isLoaded.current = false;
        }

        return () => null;
    }, [pageNumber]);

    return (
        <>
            <Button
                isDisabled={ pageNumber < 2 ? true : false }
                color='success'
                radius='sm'
                className='self-center h-unit-9 xs:px-3 xs:min-w-unit-10 xs:w-14 xxs:px-3 xxs:min-w-unit-10 xxs:w-14 pl-2.5 xs:px-0 xxs:px-0'
                startContent={<LeftArrowIcon width={14} height={14} />}
                onClick={() => {
                    isLoaded.current = true;
                    if (pageNumber > 1) {
                        setPageNumber(pageNumber - 1);
                    } else {}
                }}
            >
                <div className='xs:hidden xxs:hidden'>Prev</div>
            </Button>

            <div className={\`\${isPageNumberContainerClicked === false ? 'hidden' : 'flex'} flex flex-wrap flex-col justify-center\`}>
                <input
                    type="text"
                    className="border ml-2 rounded-small w-12 h-[22px] text-small text-center outline-none"
                    onKeyDown={restrictInput}
                    maxLength={3}
                    ref={ref}
                    onChange={(event) => {
                        setPageNumber(parseInt(event.target.value || 1));
                    }}
                    onBlur={() => {
                        setIsPageNumberContainerClicked(false);
                        fetchMoviesOrTVShows(mainURL, pageNumber);
                        window.scrollTo(0, 0);
                    }}
                />
            </div>

            <Tooltip
                color='warning'
                showArrow={true}
                offset={15} 
                content={
                    <div className='flex flex-wrap flex-col justify-center'>
                        <div className='text-center text-tiny'>click to set</div>
                        <div className='text-center text-tiny'>page number</div>
                    </div>
                }
            >
                <div
                    className={\`\${isPageNumberContainerClicked === false ? 'flex' : 'hidden'} self-center w-12 justify-center ml-2 text-small border rounded-small\`}
                    onClick={() => setIsPageNumberContainerClicked(true)}
                >
                    {pageNumber}
                </div>
            </Tooltip>

            <div className='flex flex-wrap self-center text-small ml-1 mr-0.5'>/</div>
            <div className='flex flex-wrap self-center text-small mr-2'>{ totalPages > 500 ? 500 : totalPages }</div>

            <Button
                isDisabled={ pageNumber === totalPages ? true : pageNumber === 500 ? true : false }
                color='success'
                radius='sm'
                className='self-center h-unit-9 xs:px-3 xs:min-w-unit-10 xs:w-14 xxs:px-3 xxs:min-w-unit-10 xxs:w-14 pr-2.5 xs:px-0 xxs:px-0'
                endContent={<RightArrowIcon width={14} height={14} />}
                onClick={() => {
                    isLoaded.current = true;
                    if (pageNumber < totalPages) {
                        setPageNumber(pageNumber + 1);
                    } else {}
                }}
            >
                <div className='xs:hidden xxs:hidden'>Next</div>
            </Button>
        </>
    );
});

export default PaginationComponent;`;

    const [copyJSX, setCopyJSX] = useState('Copy');

    function copyJSXCode() {
        navigator.clipboard.writeText(jsxCodeString);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const copyCopied = async () => {
            setCopyJSX('Copied');
            await delay(1000);
            setCopyJSX('Copy');
        };

        setTimeout(copyCopied, 250);
    };

    return (
        <div id='code-container' className='max-w-[702px] sm:max-w-[574px] mx-auto rounded-[5px] border border-[#656565]'>
            <div id='code-container-header' className='flex flex-wrap justify-between items-center px-5 h-10 bg-[#343A46] rounded-tl-[4px] rounded-tr-[4px] border-b border-[#656565]'>
                <div className='font-["Monaco",_sans-serif] text-sm text-white tracking-[-0.75px]'>PaginationComponent.jsx</div>
                <Button
                    className='font-["Monaco",_sans-serif] text-sm text-white px-unit-2 min-w-unit-10 h-unit-6 data-[hover=true]:bg-white data-[hover=true]:text-black'
                    color='primary'
                    variant='light'
                    onClick={copyJSXCode}
                >
                    {copyJSX}
                </Button>
            </div>
            <SyntaxHighlighter 
                language='jsx' 
                style={vscDarkPlus} 
                showLineNumbers={true} 
            >
                {jsxCodeString}
            </SyntaxHighlighter>
        </div>
    );
};