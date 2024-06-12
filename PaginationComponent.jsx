import React from "react";
import { useEffect } from 'react';
import { Button, Pagination } from '@nextui-org/react';

const PaginationComponent = ({ pageNumber, setPageNumber, mainURL, totalPages, fetchMoviesOrTVShows }) => {

    useEffect(() => {
        fetchMoviesOrTVShows(mainURL, pageNumber);
        window.scrollTo(0, 0);

        return () => null;
    }, [pageNumber]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex xs:hidden xxs:hidden items-center w-full">
                <Pagination
                    showControls
                    loop
                    isCompact
                    total={totalPages}
                    color="primary"
                    radius="sm"
                    page={pageNumber}
                    onChange={setPageNumber}
                />
            </div>
            <div className="hidden xs:flex xxs:flex items-center justify-center w-full gap-2">
                <Button
                    size="sm"
                    color="primary"
                    className="font-medium"
                    onPress={() => setPageNumber((prev) => (prev > 1 ? prev - 1 : prev))}
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    color="primary"
                    className="font-medium"
                    onPress={() => setPageNumber((prev) => (prev < 10 ? prev + 1 : prev))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PaginationComponent;