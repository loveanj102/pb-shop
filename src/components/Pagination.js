function Pagination({ pagination, changePage }) { //將Pagination作為元件單獨拉出來，傳入共用值pagination，changePage(原為getproducts)，因此處只需要用作切換頁面使用

    return (<nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className="page-item">
                <a className={`page-link ${pagination.has_pre ? '' : 'disabled'}`} //判斷如果有前一頁不做任何處理，如果沒有就加上disabled的樣式
                    href="/" aria-label="Previous"
                    onClick={(e) => {
                        e.preventDefault(); //先將預設a連結清除
                        changePage(pagination.current_page - 1);//切換頁面，是將索引值+1

                    }}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            {
                [...new Array(pagination.total_pages)].map((_, i) => ( //陣列為0-4位置長度為5，指的是頁碼參數，i代表的是索引位置
                    // eslint-disable-next-line react/no-array-index-key
                    <li className="page-item" key={`${i}_page`}>
                        <a
                            className={`page-link ${(i + 1 === pagination.current_page) && 'active'}`}
                            href="/"
                            onClick={(e) => {
                                e.preventDefault(); //先將預設a連結清除
                                changePage(i + 1);//切換頁面，是將索引值+1

                            }}
                        >
                            {i + 1}
                        </a>

                    </li>
                ))
            }
            <li className="page-item">
                <a className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
                    href="/" aria-label="Next"
                    onClick={(e) => {
                        e.preventDefault(); //先將預設a連結清除
                        changePage(pagination.current_page + 1);//切換頁面，是將索引值+1

                    }}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>)

}
export default Pagination;