module.exports = async (req, res, next) => {
  const DEFAULT_PAGE = 1
  const DEFAULT_LIMIT = 10
  const DEFAULT_SORT = 'asc'

  let {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    sort = DEFAULT_SORT
  } = req.query

  if (!(page > 0)) {
    page = DEFAULT_PAGE
  }

  if (!(limit > 0)) {
    limit = DEFAULT_LIMIT
  }

  if (!['asc', 'desc'].includes(sort)) {
    sort = DEFAULT_SORT
  }

  req.optionsPaginate = {
    page,
    limit,
    sort
  }

  return next()
}
