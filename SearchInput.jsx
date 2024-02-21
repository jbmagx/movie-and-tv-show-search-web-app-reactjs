import React from "react";
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
            placeholder={`Search for a ${search}...`}
            size="sm"
            startContent={<SearchIcon size={18} />}
            onChange={(event) => {
                setSearchKeywords(event.target.value);
                (search === 'movie') ? setMainURL(`https://api.themoviedb.org/3/search/movie?&query=${searchKeywords}&page=`) : setMainURL(`https://api.themoviedb.org/3/search/tv?&query=${searchKeywords}&page=`);
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
};