import React from "react";
import { Button, Chip } from "@nextui-org/react";
import { Tabs, Tab, Link } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Movies from "./Movies";
import TVShows from './TVShows.jsx';
import logoTMDB from './TMDB-logo.svg';
import { GitHubIcon } from '../../assets/svg-jsx/github-icon.jsx';
import MoviesSnippet from './MoviesSnippet.jsx';
import TVShowsSnippet from './TVShowsSnippet.jsx';
import SearchInputSnippet from './SearchInputSnippet.jsx';
import PaginationComponentSnippet from './PaginationComponentSnippet.jsx';

export default function MainContainer() {
    return (
        <div id="main-container">
            <div className='flex flex-wrap justify-center py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10 px-6 max-w-5xl mx-auto'>
                <h1 className="font-semibold text-xl text-center tracking-[-0.25px] mb-5 xs:mb-3 w-full xs:w-[305px]">Movie and TV Show Search Web App</h1>

                <div className="flex flex-wrap justify-center mb-20 sm2:mb-16 sm:mb-14 xs:mb-12 xxs:mb-12 w-[976px] md:w-[720px] sm2:w-full sm_previous:w-[592px] sm:w-full xs:max-w-full xs:w-full xxs:w-full">
                    <Tabs
                        aria-label="Options"
                        fullWidth
                        classNames={{
                            base: 'mb-3.5 xs:mb-1 justify-center',
                            tabList: 'w-[320px]',
                            panel: 'pb-0'
                        }}
                    >
                        <Tab
                            key="movies"
                            title="Movies"
                            className="w-full px-0"
                        >
                            <Card>
                                <CardBody>
                                    <Movies />
                                </CardBody>
                            </Card>  
                        </Tab>
                        <Tab
                            key="tv-shows"
                            title="TV Shows"
                            className="w-full px-0"
                        >
                            <Card>
                                <CardBody>
                                    <TVShows />
                                </CardBody>
                            </Card>  
                        </Tab>
                    </Tabs>
                </div>

                <div className='flex flex-wrap max-w-[622px] sm:max-w-[476px] xs:max-w-[476px] p-5 border-2 border-dotted rounded-small mb-20 sm2:mb-16 sm:mb-14 xs:mb-12 xxs:mb-10'>
                    <div className="w-full mb-2.5 xs:mb-3 text-[0.9rem] xs:text-small xxs:text-small font-semibold">Credits to:</div>
                    <div className='flex flex-wrap justify-center sm:w-full xs:w-full xxs:w-full sm:mb-3.5 xs:mb-3.5 xxs:mb-3.5'>
                        <Link href="https://www.themoviedb.org" target="_blank" className='w-14 sm:w-16 aspect-[32/23]'>
                            <img src={logoTMDB} className='self-center w-full h-full' />
                        </Link>
                    </div>
                    <div className="w-[calc(100%-56px-10px)] sm:w-full xs:w-full xxs:w-full ml-2.5 sm:ml-0 xs:ml-0 xxs:ml-0 tracking-[-0.25px] text-[0.9rem] xs:text-small xs:text-justify xxs:text-small xxs:text-justify">All data and images are supplied by The Movie Database (TMDB). This project or application uses the TMDB API but is not endorsed or certified by TMDB.</div>
                </div>

                <div className='flex flex-wrap justify-center gap-2 xs:max-w-[276px] mx-auto mb-20 sm2:mb-16 sm:mb-14 xs:mb-12 xxs:mb-10'>
                    <div className='self-center font-semibold uppercase text-small tracking-tight'>Tech Stack:</div>
                    <div className='flex flex-wrap justify-center gap-2'>
                        <Link href='https://react.dev/' target='_blank'>
                            <Chip
                                variant="solid"
                                color="primary"
                                radius='sm'
                                size="sm"
                                classNames={{ content: "font-['Inter',sans-serif]" }}
                            >
                                ReactJS
                            </Chip>
                        </Link>
                        <Link href='https://developer.themoviedb.org/reference/intro/getting-started' target='_blank'>
                            <Chip
                                variant="solid"
                                color="danger"
                                radius='sm'
                                size="sm"
                                classNames={{ content: "font-['Inter',sans-serif]" }}
                            >
                                TMBD API
                            </Chip>
                        </Link>
                        <Link href='https://nextui.org/' target='_blank'>
                            <Chip
                                variant="solid"
                                color="secondary"
                                radius='sm'
                                size="sm"
                                classNames={{ content: "font-['Inter',sans-serif]" }}
                            >
                                NextUI
                            </Chip>
                        </Link>
                        <Link href='https://tailwindcss.com/' target='_blank'>
                            <Chip
                                variant="solid"
                                color="success"
                                radius='sm'
                                size="sm"
                                classNames={{ content: "font-['Inter',sans-serif]" }}
                            >
                                Tailwind CSS
                            </Chip>
                        </Link>
                    </div>
                </div>
                
                <div className="w-full mb-10 xxs:mb-8">
                    <MoviesSnippet />
                </div>

                <div className="w-full mb-10 xxs:mb-8">
                    <TVShowsSnippet />
                </div>

                <div className="w-full mb-10 xxs:mb-8">
                    <SearchInputSnippet />
                </div>

                <div className="w-full mb-20 sm2:mb-16 sm:mb-14 xs:mb-12 xxs:mb-10">
                    <PaginationComponentSnippet />
                </div>

                <div className='flex flex-wrap justify-center'>
                    <Link href='https://github.com/jbmagx/movie-and-tv-show-search-web-app-reactjs' target='_blank'>
                        <Button
                            className='bg-[#0A7EA4] text-sm uppercase font-semibold py-6 px-8'
                            color='primary'
                            variant='solid'
                            radius='full'
                            endContent={<GitHubIcon height={32} width={32} fill={'#FFFFFF'} />}
                        >
                            Project Repository
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};