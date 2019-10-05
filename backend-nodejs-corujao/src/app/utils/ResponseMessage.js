module.exports = {
  getResponseMessageOK(value, res) {    
    const { hostname } = res.req._parsedUrl;    
    const { host } = res.req.headers;
    const page = res.req.query.page || null;
    const size = res.req.query.size || null;

    let numberOfRecords = 0;
    if (Array.isArray(value)) {
      numberOfRecords = value.length;
    }
    else if (value) {
      numberOfRecords = 1;
    }
  
    return res.status(200).json({
      record: value, 
      meta: { 
        host, hostname, numberOfRecords, page, size
      }
    });
  },

  getResponseMessageOKDelete(res) {
    return res.status(204).json({message: 'Data has been removed!'});
  },

  getResponseErrorClientSide(status, res) {
    let type = 'Cliente side error';
    let error = '';

    if (status === 400) {
      error = 'Invalid parameters';
    }
    else if (status === 404) {
      error = 'Not found';
    }
    
    return res.status(status).json({ 
      code: status, type, message: error
    });
  },

  getResponseErrorServerSide(error, res) {
    return res.status(500).json({ 
      code: 500, type: 'Server side error', message: `${error}` 
    });
  }
}