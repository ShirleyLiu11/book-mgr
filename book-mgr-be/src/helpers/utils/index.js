const getYearByTimeStamp = (ts) => {
    const data = new Date(ts);

    return data.getFullYear();

};
  


module.exports = getYearByTimeStamp;