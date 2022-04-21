export const sortApprovalsAndRequestByDate = (dates) => {
  return dates.sort((date1, date2) => {
    let tempDate1 = new Date(date1?.createdAt);
    let tempDate2 = new Date(date2?.createdAt);
    return tempDate1 < tempDate2 ? 1 : tempDate1 > tempDate2 ? -1 : 0;
  });
};
