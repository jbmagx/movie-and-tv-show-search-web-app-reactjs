import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, CircularProgress, Tooltip, ScrollShadow } from '@nextui-org/react';
import SearchInput from './SearchInput.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import NoImage from '../../assets/svg/no-image.svg';
import axios from '../../axios/axios.js';

export default function TVShows() {
    const [isLoading, setIsLoading] = useState(true);
    
    const [pageNumber, setPageNumber] = useState(1);
    const firstUseEffectExecuted = useRef(false);

    const [tvshows, setTVShows] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState('');
    const [totalPages, setTotalPages] = useState(500);
    const [mainURL, setMainURL] = useState('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&page=');

    const fetchMoviesOrTVShows = async (url, page) => {
        try {
            const response = await axios.post('/api/projects/movie-and-tv-show-search-web-app/tmdb',
                { url: url + page },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            // Used for debugging. Uncomment if you need to debug.
            // console.log(response?.data);

            const fetchedTVShows = response?.data;

            setTVShows(fetchedTVShows.results);

            setTotalPages(fetchedTVShows.total_pages > 500 ? 500 : fetchedTVShows.total_pages);

            setIsLoading(false);

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        if (firstUseEffectExecuted.current === false) {            
            fetchMoviesOrTVShows(mainURL, pageNumber);

            return () => {
                firstUseEffectExecuted.current = true;
            };
        }
    }, []);

    useEffect(() => {    
        if (!isLoading && searchKeywords === '') {
            fetchMoviesOrTVShows('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&page=', 1);
        }
    }, [searchKeywords]);

    return (
        <div className="p-2 xs:p-0 xxs:p-0">
            <div className="w-[932px] md:w-[680px] sm2:w-full sm:w-full xs:w-full xxs:w-full mx-auto mb-5 xs:mb-3">
                <SearchInput
                    search={'tv show'}
                    searchKeywords={searchKeywords}
                    setSearchKeywords={setSearchKeywords}
                    fetchMoviesOrTVShows={fetchMoviesOrTVShows}
                    mainURL={mainURL}
                    setMainURL={setMainURL}
                    setPageNumber={setPageNumber}
                />
            </div>

            <div className="flex flex-wrap gap-5 xs:gap-3 xxs:gap-3">
                {
                    (tvshows.length === 0 && searchKeywords !== '')
                    ?   <div className='mx-auto my-32 text-center'>There are no TV shows that matched your query.</div>
                    :   <>
                            {
                                tvshows.map((tvshow) => (
                                    <div
                                        key={tvshow.id}
                                        className="flex flex-wrap w-full h-[224px] md:h-[203px] sm:h-[170px] xs:h-[143px] xxs:h-[122px] border rounded-small"
                                    >
                                        <Link
                                            href={`https://www.themoviedb.org/tv/${tvshow.id}`}
                                            target="_blank"
                                        >
                                            <div className="min-w-[80px] w-[148px] md:w-[134px] sm:w-[112px] xs:w-[94px] xxs:w-[80px] h-full">
                                                <img
                                                    src={
                                                            `${tvshow.poster_path === null 
                                                            ?   NoImage 
                                                            :   `https://image.tmdb.org/t/p/original/${tvshow.poster_path}`}`
                                                        }
                                                    className="rounded-tl-small rounded-bl-small object-cover w-full h-full"
                                                />
                                            </div>
                                        </Link>
                                        <div className="flex flex-wrap flex-col justify-center gap-0 p-5 xs:p-3 xxs:p-3 overflow-hidden w-[calc(100%-148px)] max-h-[224px] md:w-[calc(100%-134px)] md:max-h-[201px] sm:w-[calc(100%-112px)] sm:max-h-[168px] xs:w-[calc(100%-94px)] xs:max-h-[141px] xxs:w-[calc(100%-80px)] xxs:max-h-[122px]">
                                            <div className="flex flex-wrap">
                                                <div className="w-12 h-12 sm:w-10 sm:h-10 xs:hidden xxs:hidden">
                                                    <Tooltip
                                                        content="User Score"
                                                        className="text-tiny"
                                                        showArrow={true}
                                                        color={
                                                            tvshow.vote_average * 10 > 70
                                                                ? 'success'
                                                                : tvshow.vote_average * 10 < 40
                                                                ? 'danger'
                                                                : 'warning'
                                                        }
                                                    >
                                                        <CircularProgress
                                                            aria-label="Loading..."
                                                            value={tvshow.vote_average * 10}
                                                            color={
                                                                tvshow.vote_average * 10 > 70
                                                                    ? 'success'
                                                                    : tvshow.vote_average * 10 < 40
                                                                    ? 'danger'
                                                                    : 'warning'
                                                            }
                                                            showValueLabel={true}
                                                            classNames={{
                                                                svg: 'w-12 h-12 sm:w-10 sm:h-10',
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                                <div className="w-[calc(100%-56px)] sm:w-[calc(100%-48px)] xs:w-full xxs:w-full flex flex-wrap flex-col justify-center gap-0 ml-2 xs:ml-0 xxs:ml-0">
                                                    <Link
                                                        href={`https://www.themoviedb.org/tv/${tvshow.id}`}
                                                        target="_blank"
                                                    >
                                                        <h2 className="w-full max-h-10 self-center line-clamp-1 xs:line-clamp-2 xxs:line-clamp-1 text-base sm:text-sm xs:text-sm xxs:text-sm font-semibold text-black tracking-[-0.25px]">{`${tvshow.original_name}`}</h2>
                                                    </Link>
                                                    <small className="w-full self-center text-sm sm:text-xs xs:text-xs xxs:text-xs text-default-500 tracking-[-0.25px]">{`${tvshow.first_air_date}`}</small>
                                                </div>
                                            </div>
                                            <ScrollShadow
                                                hideScrollBar
                                                size={16}
                                                className="w-full self-center max-h-[128px] mt-[8px] md:max-h-[106px] md:mt-[7px] sm:max-h-[82px] sm:mt-[6px] xs:max-h-[54px] xs:mt-[5px] xxs:max-h-[50px] xxs:mt-[5px]"
                                            >
                                                <p className="w-full self-center text-black text-sm sm:text-tiny xs:text-tiny xxs:text-tiny">{`${tvshow.overview}`}</p>
                                            </ScrollShadow>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                }
            </div>

            <div className='flex flex-wrap justify-center mt-5'>
                <PaginationComponent
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    mainURL={mainURL}
                    totalPages={totalPages}
                    fetchMoviesOrTVShows={fetchMoviesOrTVShows}
                />
            </div>
        </div>
    );
};