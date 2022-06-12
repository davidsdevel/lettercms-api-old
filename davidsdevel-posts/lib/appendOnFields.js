const appendOnFields = (fields, field) => {
  const splittedFields = fields.split(',');
  if (splittedFields.indexOf(field) === -1) {
    splittedFields.push(field);
    return splittedFields.join(',');
  }
};

module.exports = appendOnFields;
