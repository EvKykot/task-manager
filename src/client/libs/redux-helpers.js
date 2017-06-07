/**
 *
 * @param {Object} opts
 * @param {Function} [opts.preFn]
 * @param {Function} opts.fn
 * @param {String|Function} opts.success
 * @param {String|Function} opts.error
 * @param {Function} opts.postSuccess
 * @returns {Function}
 */
export function createAsyncAction(opts) {
  const {preFn, fn, success, error} = opts;
  const {transformData} = opts;
  const createSuccess = typeof success === 'function' ? success : (body, data) => ({type: success, data: body});
  const createError = typeof error === 'function' ? error : err => ({type: error, error: err});

  return data => (dispatch, getState) => {
    if (preFn && preFn(dispatch, getState, data)) return;
    if (transformData) data = transformData(data, getState);

    fn(data, (err, res) => {
      const event = err ? createError(err, data) : createSuccess(res, data);
      dispatch(event);

      if (!err && opts.postSuccess) opts.postSuccess(dispatch, getState);
    });
  };
}
