import React from 'react';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import './Snippet.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function SearchInputSnippet() {
    const jsxCodeString = `import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from '../../assets/svg-jsx/search-icon.jsx';

export default function SearchInput({ search, searchKeywords, setSearchKeywords, fetchMoviesOrTVShows, mainURL, setMainURL, setPageNumber }) {
    return (
        <Input
            classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder={\`Search for a \${search}...\`}
            size="sm"
            startContent={<SearchIcon size={18} />}
            onChange={(event) => {
                setSearchKeywords(event.target.value);
                (search === 'movie') ? setMainURL(\`https://api.themoviedb.org/3/search/movie?&query=\${searchKeywords}&page=\`) : setMainURL(\`https://api.themoviedb.org/3/search/tv?&query=\${searchKeywords}&page=\`);
                // console.log(searchKeywords, mainURL);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    setPageNumber(1);
                    event.target.value !== '' ? fetchMoviesOrTVShows(mainURL, 1) : null;
                }
            }}
        />
    );
};`;

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
                <div className='font-["Monaco",_sans-serif] text-sm text-white tracking-[-0.75px]'>SearchInput.jsx</div>
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