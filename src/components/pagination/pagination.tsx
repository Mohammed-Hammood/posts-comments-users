"use client";
import ReactPaginate from "react-paginate";
import { ICON } from "@/components";
import styles from "./pagination.module.scss";

type Props = {
    page:number;
    total_pages: number;
    setPage: (value: number) => void;
}

export const Pagination = ({ setPage,  page, total_pages }: Props): JSX.Element => {
    return (
        <ReactPaginate
            pageCount={total_pages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            onPageChange={({ selected }: { selected: number }) => setPage(selected + 1)}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            initialPage={page - 1}
            nextLabel={<ICON name='angles-right' height={"15px"} width='15px' />}
            previousLabel={<ICON name='angles-left' height={"15px"} width='15px' />}
        />
    )
}