import _ from 'lodash'

const PaginationUtil = (totalPage, page, limit, siblings) => {
    let totalPageNoInArray = 7 + siblings
    if (totalPageNoInArray >= totalPage) {
        return _.range(1, totalPage + 1)
    }

    let leftSiblingsIndex = Math.max(page - siblings, 1)
    let righSiblingsIndex = Math.min(page + siblings, totalPage)

    let showLeftDots = leftSiblingsIndex > 2
    let showRightDots = righSiblingsIndex < totalPage - 2

    if (!showLeftDots && showRightDots){
        let leftItemsCount = 3 + 2 * siblings
        let leftRange = _.range(1, leftItemsCount + 1)
        return [...leftRange, "...", totalPage]
    } else if (showLeftDots && !showRightDots){
        let rightItemsCount = 3 + 2 * siblings
        let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1)
        return [1, "...", ...rightRange]
    } else {
        let middleRange = _.range(leftSiblingsIndex, righSiblingsIndex + 1)
        return [1, "...", ...middleRange, "...", totalPage]
    }
}

export default PaginationUtil