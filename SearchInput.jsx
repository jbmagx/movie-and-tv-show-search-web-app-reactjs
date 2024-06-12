import React from "react";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { SearchIcon } from '../../assets/svg-jsx/search-icon.jsx';

export default function SearchInput({ search, searchKeywords, setSearchKeywords, fetchMoviesOrTVShows, mainURL, setMainURL, setPageNumber }) {
    return (
        <div className="flex items-center w-full">
            <div className="flex items-center w-full">
                <Input
                    classNames={{
                        base: "max-w-full h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-tr-none rounded-br-none",
                    }}
                    placeholder={`Search for a ${search}...`}
                    size="sm"
                    onChange={(event) => {
                        setSearchKeywords(event.target.value);
                        const mainUrl = search === 'movie' ? `https://api.themoviedb.org/3/search/movie?&query=${searchKeywords}&page=` : `https://api.themoviedb.org/3/search/tv?&query=${searchKeywords}&page=`;
                        setMainURL(mainUrl);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setPageNumber(1);
                            event.target.value !== '' ? fetchMoviesOrTVShows(mainURL, 1) : null;
                        }
                    }}
                />
            </div>
            <Tooltip
                content="Search"
                showArrow
                delay={1000}
            >
                <Button
                    isIconOnly
                    className="h-10 rounded-tl-none rounded-bl-none shadow-sm"
                    onPress={() => {
                        if (searchKeywords !== '')  fetchMoviesOrTVShows(mainURL, 1);
                    }}
                >
                    <SearchIcon size={18} />
                </Button>
            </Tooltip>
        </div>
    );
};