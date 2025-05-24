
function validateRow(row, rowIndex) {
    // registration_no validation
    if (!row.registration_no || typeof row.registration_no !== 'string' || !row.registration_no.trim()) {
      return `Row ${rowIndex + 2}: Invalid or missing "registration_no"`;
    }
  
    // year validation
    const year = parseInt(row.year, 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      return `Row ${rowIndex + 2}: Invalid "year". Must be a 4-digit year between 1900 and 2100.`;
    }
  
    // session_id validation
    if (!row.session_id || (typeof row.session_id !== 'string' && typeof row.session_id !== 'number')) {
      return `Row ${rowIndex + 2}: Missing or invalid "session_id"`;
    }
  
    // full_name validation
    if (!row.full_name || typeof row.full_name !== 'string' || !row.full_name.trim()) {
      return `Row ${rowIndex + 2}: Invalid or missing "full_name"`;
    }
  
    // fathers_name validation
    if (!row.fathers_name || typeof row.fathers_name !== 'string' || !row.fathers_name.trim()) {
      return `Row ${rowIndex + 2}: Invalid or missing "fathers_name"`;
    }
  
    // dob validation - check if valid date
    if (!row.dob || isNaN(new Date(row.dob).getTime())) {
      return `Row ${rowIndex + 2}: Invalid or missing "dob". Must be a valid date.`;
    }
  
    // mobile validation - simple digits only and length check (assuming 10 digits)
    const mobile = row.mobile?.toString().trim();
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return `Row ${rowIndex + 2}: Invalid or missing "mobile". Must be 10 digit number.`;
    }
  
    // If all checks pass
    return null;
  }
  
  module.exports = { validateRow };
  