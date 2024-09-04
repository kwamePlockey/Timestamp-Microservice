const isDateValid = (date) => {
    return !isNaN(new Date(date)) || !isNaN(new Date(Number(date)))
  }


  module.exports = {isDateValid}
