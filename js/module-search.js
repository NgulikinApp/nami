function initSearch(){
    $('#pagingSearch').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
}